import { useState } from "react";
import { Anchor, Button, Group, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import sourcesService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import { useTranslation } from "react-i18next";
import Source from "../../../types/Source";

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string(),
});

export type FormData = z.infer<typeof schema>

export type UpsertSourceDto = FormData

interface Props {
    title: string
    isOpened: boolean
    selectedSource?: Source
    onClose: () => void
    onSubmit: () => void
}

export default function UpsertSourceModal({ title, isOpened, selectedSource, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            name: selectedSource?.name || '',
            description: selectedSource?.description || ''
        },
        validate: zodResolver(schema),
    });


    const handleCancel = () => {
        onClose()
    }

    const handleSubmit = async (data: FormData) => {
        const upsertSourceDto: UpsertSourceDto = {
            name: data.name,
            description: data.description
        }


        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedSource) {
                await sourcesService.updateSource(selectedSource.id, upsertSourceDto)
                alertSuccess("Source updated successfully!")
            } else {
                await sourcesService.createSource(upsertSourceDto)
                alertSuccess("New source added successfully!")
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
        <Modal title={title} opened={isOpened} onClose={handleCancel} closeOnClickOutside={false}>
            <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        data-autofocus
                        label={tGlossary("source.name")}
                        placeholder={tGlossary("source.name")}
                        name="name"
                        withAsterisk
                        {...form.getInputProps('name')}
                    />
                    <Textarea
                        label={tGlossary("source.description")}
                        placeholder={tGlossary("source.description")}
                        name="description"
                        // withAsterisk
                        {...form.getInputProps('description')}
                    />
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" variant="gradient" onClick={handleCancel} size="sm">
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