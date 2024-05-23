import { useState } from "react";
import { Anchor, Button, Group, Modal, SimpleGrid, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { getCountryCallingCode, getNationalNumber } from "../../../../lib/libphonenumber-js";
import { wait } from "../../../../utils/helpers";
import PhoneInputWithCountryCombobox from "../../../../components/PhoneInput";
import individualsService from "../services"
import { alertSuccess } from "../../../../utils/feedback";
import { useTranslation } from "react-i18next";
import Individual from "../../../../types/Individual";


const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    nationalId: z.string().min(1, 'National id is required'),
    email: z.string().email('Invalid email'),
    address: z.string(),
    dial_code: z.string(),
    nationalPhoneNumber: z.string().min(1, 'Phone number is required')
});

export type FormData = z.infer<typeof schema>

export type UpsertIndividualDto = Omit<FormData, 'dial_code' | 'nationalPhoneNumber'> & { phoneNumber: string }

interface Props {
    title: string
    isOpened: boolean
    selectedIndividual?: Individual
    onClose: () => void
    onSubmit: () => void
}

export default function UpsertIndividualModal({ title, isOpened, selectedIndividual, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            firstName: selectedIndividual?.firstName || '',
            lastName: selectedIndividual?.lastName || '',
            nationalId: selectedIndividual?.nationalId || '',
            email: selectedIndividual?.email || '',
            address: selectedIndividual?.address || '',
            dial_code: (selectedIndividual?.phoneNumber && getCountryCallingCode(selectedIndividual.phoneNumber)) ?? '+216',
            nationalPhoneNumber: (selectedIndividual?.phoneNumber && getNationalNumber(selectedIndividual.phoneNumber)) ?? ''
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const upsertIndividualDto: UpsertIndividualDto = {
            firstName: data.firstName,
            lastName: data.lastName,
            nationalId: data.nationalId,
            email: data.email,
            address: data.address,
            phoneNumber: data.dial_code + data.nationalPhoneNumber,
        }


        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedIndividual) {
                await individualsService.updateIndividual(selectedIndividual.id, upsertIndividualDto)
                alertSuccess("Individual (owner) updated successfully!")
            } else {
                await individualsService.createIndividual(upsertIndividualDto)
                alertSuccess("New individual (owner) created successfully!")
                form.reset()
            }

            onSubmit()
            onClose()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Modal title={title} size="lg" opened={isOpened} onClose={onClose} closeOnClickOutside={false}>
            <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <TextInput
                            data-autofocus
                            label={tGlossary("individual.firstName")}
                            placeholder={tGlossary("individual.firstName")}
                            name="firstName"
                            withAsterisk
                            {...form.getInputProps('firstName')}
                        />
                        <TextInput
                            label={tGlossary("individual.lastName")}
                            placeholder={tGlossary("individual.lastName")}
                            name="lastName"
                            withAsterisk
                            {...form.getInputProps('lastName')}
                        />
                    </SimpleGrid>

                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <TextInput
                            label={tGlossary("individual.nationalId")}
                            placeholder={tGlossary("individual.nationalId")}
                            name="nationalId"
                            withAsterisk
                            {...form.getInputProps('nationalId')}
                        />
                        <PhoneInputWithCountryCombobox
                            input={{
                                label: tGlossary("individual.phoneNumber"),
                                placeholder: tGlossary("individual.phoneNumber"),
                                name: "nationalPhoneNumber",
                                ...form.getInputProps('nationalPhoneNumber')
                            }}
                            combobox={{
                                onChange: (v) => form.setFieldValue('dial_code', v),
                                dial_code: form.values.dial_code
                            }}
                        />
                    </SimpleGrid>

                    <TextInput
                        label={tGlossary("individual.email")}
                        placeholder={tGlossary("individual.email")}
                        name="email"
                        withAsterisk
                        {...form.getInputProps('email')}
                    />

                    <Textarea
                        label={tGlossary("individual.address")}
                        placeholder={tGlossary("individual.address")}
                        name="address"
                        // withAsterisk
                        {...form.getInputProps('address')}
                    />
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" variant="gradient" onClick={onClose} size="sm">
                        {t("buttons.cancel")}
                    </Anchor>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                        {t("buttons.save")}
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}