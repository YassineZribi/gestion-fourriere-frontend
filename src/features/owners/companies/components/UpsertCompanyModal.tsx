import { useState } from "react";
import { Anchor, Button, Group, Modal, SimpleGrid, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { getCountryCallingCode, getNationalNumber } from "../../../../lib/libphonenumber-js";
import { wait } from "../../../../utils/helpers";
import PhoneInputWithCountryCombobox from "../../../../components/PhoneInput";
import companiesService from "../services"
import { alertSuccess } from "../../../../utils/feedback";
import { useTranslation } from "react-i18next";
import Company from "../../../../types/Company";


const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    taxId: z.string().min(1, 'Tax id is required'),
    email: z.string().email('Invalid email'),
    address: z.string(),
    dial_code: z.string(),
    nationalPhoneNumber: z.string().min(1, 'Phone number is required')
});

export type FormData = z.infer<typeof schema>

export type UpsertCompanyDto = Omit<FormData, 'dial_code' | 'nationalPhoneNumber'> & { phoneNumber: string }

interface Props {
    title: string
    isOpened: boolean
    selectedCompany?: Company
    onClose: () => void
    onSubmit: () => void
}

export default function UpsertCompanyModal({ title, isOpened, selectedCompany, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            name: selectedCompany?.name || '',
            taxId: selectedCompany?.taxId || '',
            email: selectedCompany?.email || '',
            address: selectedCompany?.address || '',
            dial_code: (selectedCompany?.phoneNumber && getCountryCallingCode(selectedCompany.phoneNumber)) ?? '+216',
            nationalPhoneNumber: (selectedCompany?.phoneNumber && getNationalNumber(selectedCompany.phoneNumber)) ?? ''
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const upsertCompanyDto: UpsertCompanyDto = {
            name: data.name,
            taxId: data.taxId,
            email: data.email,
            address: data.address,
            phoneNumber: data.dial_code + data.nationalPhoneNumber,
        }


        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedCompany) {
                await companiesService.updateCompany(selectedCompany.id, upsertCompanyDto)
                alertSuccess("Company (owner) updated successfully!")
            } else {
                await companiesService.createCompany(upsertCompanyDto)
                alertSuccess("New company (owner) created successfully!")
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
                            label={tGlossary("company.name")}
                            placeholder={tGlossary("company.name")}
                            name="name"
                            withAsterisk
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            label={tGlossary("company.taxId")}
                            placeholder={tGlossary("company.taxId")}
                            name="taxId"
                            withAsterisk
                            {...form.getInputProps('taxId')}
                        />
                    </SimpleGrid>

                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <PhoneInputWithCountryCombobox
                            input={{
                                label: tGlossary("company.phoneNumber"),
                                placeholder: tGlossary("company.phoneNumber"),
                                name: "nationalPhoneNumber",
                                ...form.getInputProps('nationalPhoneNumber')
                            }}
                            combobox={{
                                onChange: (v) => form.setFieldValue('dial_code', v),
                                dial_code: form.values.dial_code
                            }}
                        />
                        <TextInput
                            label={tGlossary("company.email")}
                            placeholder={tGlossary("company.email")}
                            name="email"
                            withAsterisk
                            {...form.getInputProps('email')}
                        />
                    </SimpleGrid>

                    <Textarea
                        label={tGlossary("company.address")}
                        placeholder={tGlossary("company.address")}
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