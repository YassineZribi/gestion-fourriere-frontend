import { useState } from "react";
import { Anchor, Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import measurementUnitsService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import { useTranslation } from "react-i18next";
import MeasurementUnit from "../../../types/MeasurementUnit";

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    symbol: z.string().min(1, 'Symbol is required'),
});

export type FormData = z.infer<typeof schema>

export type UpsertMeasurementUnitDto = FormData

interface Props {
    title: string
    isOpened: boolean
    selectedMeasurementUnit?: MeasurementUnit
    onClose: () => void
    onSubmit: () => void
}

export default function UpsertMeasurementUnitModal({ title, isOpened, selectedMeasurementUnit, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            name: selectedMeasurementUnit?.name || '',
            symbol: selectedMeasurementUnit?.symbol || ''
        },
        validate: zodResolver(schema),
    });


    const handleCancel = () => {
        onClose()
    }

    const handleSubmit = async (data: FormData) => {
        const upsertMeasurementUnitDto: UpsertMeasurementUnitDto = {
            name: data.name,
            symbol: data.symbol
        }


        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedMeasurementUnit) {
                await measurementUnitsService.updateMeasurementUnit(selectedMeasurementUnit.id, upsertMeasurementUnitDto)
                alertSuccess("Measurement unit updated successfully!")
            } else {
                await measurementUnitsService.createMeasurementUnit(upsertMeasurementUnitDto)
                alertSuccess("New measurement unit created successfully!")
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
                        label={tGlossary("measurementUnit.name")}
                        placeholder={tGlossary("measurementUnit.name")}
                        name="name"
                        withAsterisk
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        label={tGlossary("measurementUnit.symbol")}
                        placeholder={tGlossary("measurementUnit.symbol")}
                        name="symbol"
                        withAsterisk
                        {...form.getInputProps('symbol')}
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