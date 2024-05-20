import { useState } from "react";
import { Anchor, Button, Group, Modal, ModalBaseProps, Stack, TextInput } from "@mantine/core";
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
    size?: ModalBaseProps['size']
    isOpened: boolean
    selectedMeasurementUnit?: MeasurementUnit
    onClose: () => void
    onSubmit: (savedMeasurementUnit: MeasurementUnit) => void
}

export default function UpsertMeasurementUnitModal({ title, size = "md", isOpened, selectedMeasurementUnit, onClose, onSubmit }: Props) {
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

        let savedMeasurementUnit: MeasurementUnit;

        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedMeasurementUnit) {
                const res = await measurementUnitsService.updateMeasurementUnit(selectedMeasurementUnit.id, upsertMeasurementUnitDto)
                savedMeasurementUnit = res.data
                alertSuccess("Measurement unit updated successfully!")
            } else {
                const res = await measurementUnitsService.createMeasurementUnit(upsertMeasurementUnitDto)
                savedMeasurementUnit = res.data
                alertSuccess("New measurement unit created successfully!")
                form.reset()
            }

            onSubmit(savedMeasurementUnit)
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
                        {t("buttons.save")}
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}