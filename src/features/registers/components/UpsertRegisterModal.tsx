import { useState } from "react";
import { Anchor, Button, Group, Modal, ModalBaseProps, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import registersService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import { useTranslation } from "react-i18next";
import Register from "../../../types/Register";

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    observation: z.string(),
});

export type FormData = z.infer<typeof schema>

export type UpsertRegisterDto = FormData

interface Props {
    title: string
    size?: ModalBaseProps['size']
    isOpened: boolean
    selectedRegister?: Register
    onClose: () => void
    onSubmit: (savedRegister: Register) => void
}

export default function UpsertRegisterModal({ title, size = "md", isOpened, selectedRegister, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            name: selectedRegister?.name || '',
            observation: selectedRegister?.observation || ''
        },
        validate: zodResolver(schema),
    });


    const handleCancel = () => {
        onClose()
    }

    const handleSubmit = async (data: FormData) => {
        const upsertRegisterDto: UpsertRegisterDto = {
            name: data.name,
            observation: data.observation
        }

        let savedRegister: Register;

        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedRegister) {
                const res = await registersService.updateRegister(selectedRegister.id, upsertRegisterDto)
                savedRegister = res.data
                alertSuccess("Register updated successfully!")
            } else {
                const res = await registersService.createRegister(upsertRegisterDto)
                savedRegister = res.data
                alertSuccess("New register added successfully!")
                form.reset()
            }

            onSubmit(savedRegister)
            onClose()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Modal title={title} size={size} opened={isOpened} onClose={handleCancel} closeOnClickOutside={false}>
            <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        data-autofocus
                        label={tGlossary("register.name")}
                        placeholder={tGlossary("register.name")}
                        name="name"
                        withAsterisk
                        {...form.getInputProps('name')}
                    />
                    <Textarea
                        label={tGlossary("register.observation")}
                        placeholder={tGlossary("register.observation")}
                        name="observation"
                        // withAsterisk
                        {...form.getInputProps('observation')}
                    />
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" variant="gradient" onClick={handleCancel} size="sm">
                        {t("buttons.cancel")}
                    </Anchor>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                        {t("buttons.confirm")}
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}