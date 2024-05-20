import { useState } from "react";
import { Anchor, Button, Group, Modal, NumberInput, Radio, SimpleGrid, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { capitalize, wait } from "../../../utils/helpers";
import articleFamiliesService from "../services"
import registersService from '../../registers/services'
import measurementUnitsService from '../../measurement-units/services'
import { alertSuccess } from "../../../utils/feedback";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../components/SearchableCombobox";
import RegisterSelectOption from "../../registers/components/RegisterSelectOption";
import ArticleFamily from "../../../types/ArticleFamily";
import MeasurementUnitSelectOption from "../../measurement-units/components/MeasurementUnitSelectOption";
import { calculationMethods } from "./helpers";
import FileDropzone from "../../../components/FileDropzone";
import { FileWithPath } from "@mantine/dropzone";

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string(),
    nightlyAmount: z.number({ invalid_type_error: "Nightly amount is required" }).gt(0, "Nightly amount should be greather than 0"),
    unitCalculation: z.enum(["true", "false"]),
    registerId: z.number().refine((value) => value !== -1, {
        message: 'Register is required',
    }),
    measurementUnitId: z.number().refine((value) => value !== -1, {
        message: 'Measurement unit is required',
    })
});

export type FormData = z.infer<typeof schema>

export type UpsertArticleFamilyDto = Omit<FormData, 'unitCalculation'> & { unitCalculation: boolean }

interface Props {
    title: string
    isOpened: boolean
    selectedArticlefamily?: ArticleFamily
    onClose: () => void
    onSubmit: () => void
}

export default function UpsertArticleFamilyModal({ title, isOpened, selectedArticlefamily, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const [register, setRegister] = useState(selectedArticlefamily?.register ?? null)
    const [photoFile, setPhotoFile] = useState<FileWithPath | null>(null);
    const [measurementUnit, setMeasurementUnit] = useState(selectedArticlefamily?.measurementUnit ?? null)
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            name: selectedArticlefamily?.name || '',
            description: selectedArticlefamily?.description || '',
            nightlyAmount: selectedArticlefamily?.nightlyAmount || 0,
            unitCalculation: selectedArticlefamily?.unitCalculation ? "true" : "false",
            registerId: selectedArticlefamily?.register?.id || -1,
            measurementUnitId: selectedArticlefamily?.measurementUnit?.id || -1
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const upsertArticleFamilyDto: UpsertArticleFamilyDto = {
            name: data.name,
            description: data.description,
            nightlyAmount: data.nightlyAmount,
            unitCalculation: data.unitCalculation === "true",
            registerId: data.registerId,
            measurementUnitId: data.measurementUnitId
        }
        console.log(upsertArticleFamilyDto);


        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedArticlefamily) {
                await articleFamiliesService.updateArticleFamily(selectedArticlefamily.id, upsertArticleFamilyDto, photoFile)
                alertSuccess("Article family updated successfully!")
            } else {
                await articleFamiliesService.createArticleFamily(upsertArticleFamilyDto, photoFile)
                alertSuccess("New articlefamily created successfully!")
                form.reset()
                setRegister(null)
                setMeasurementUnit(null)
            }
            setPhotoFile(null)

            onSubmit()
            onClose()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Modal size={"lg"} title={title} opened={isOpened} onClose={onClose} closeOnClickOutside={false}>
            <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <TextInput
                            data-autofocus
                            label={tGlossary("articleFamily.name")}
                            placeholder={tGlossary("articleFamily.name")}
                            name="name"
                            withAsterisk
                            {...form.getInputProps('name')}
                        />
                        <SearchableCombobox
                            selectedEntity={register}
                            placeholder={tGlossary("articleFamily.register")}
                            label={tGlossary("articleFamily.register")}
                            error={form.errors.registerId?.toString()}
                            withAsterisk
                            onFetch={registersService.getAllRegistersByName}
                            onSelectOption={newRegister => {
                                setRegister(newRegister)
                                if (newRegister) {
                                    form.setFieldValue("registerId", newRegister.id)
                                }
                                form.clearFieldError("registerId")
                            }}
                            onClear={() => {
                                setRegister(null)
                                form.setFieldValue("registerId", -1)
                                form.clearFieldError("registerId")
                            }}
                        >
                            {
                                (register) => <RegisterSelectOption register={register} />
                            }
                        </SearchableCombobox>
                    </SimpleGrid>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <SearchableCombobox
                            selectedEntity={measurementUnit}
                            placeholder={tGlossary("articleFamily.measurementUnit")}
                            label={tGlossary("articleFamily.measurementUnit")}
                            error={form.errors.measurementUnitId?.toString()}
                            withAsterisk
                            onFetch={measurementUnitsService.getAllMeasurementUnitsByNameOrSymbol}
                            onSelectOption={newMeasurementUnit => {
                                setMeasurementUnit(newMeasurementUnit)
                                if (newMeasurementUnit) {
                                    form.setFieldValue("measurementUnitId", newMeasurementUnit.id)
                                }
                                form.clearFieldError("measurementUnitId")
                            }}
                            onClear={() => {
                                setMeasurementUnit(null)
                                form.setFieldValue("measurementUnitId", -1)
                                form.clearFieldError("measurementUnitId")
                            }}
                        >
                            {
                                (measurementUnit) => <MeasurementUnitSelectOption measurementUnit={measurementUnit} />
                            }
                        </SearchableCombobox>
                        <NumberInput
                            label={tGlossary("articleFamily.nightlyAmount")}
                            placeholder={tGlossary("articleFamily.nightlyAmount")}
                            name="nightlyAmount"
                            withAsterisk
                            {...form.getInputProps('nightlyAmount')}
                        />
                    </SimpleGrid>
                    <Radio.Group
                        label={tGlossary("articleFamily.calculationMethod")}
                        name="unitCalculation"
                        {...form.getInputProps('unitCalculation')}
                        withAsterisk
                    >
                        <Group justify="center" gap={"xl"}>
                            {
                                calculationMethods.map((method) => {
                                    return (
                                        <Radio
                                            key={method.label}
                                            value={String(method.value)}
                                            label={capitalize(tGlossary(`calculationMethods.${method.label}`))}
                                        />
                                    )
                                })
                            }
                        </Group>
                    </Radio.Group>
                    <Textarea
                        label={tGlossary("articleFamily.description")}
                        placeholder={tGlossary("articleFamily.description")}
                        name="description"
                        // withAsterisk
                        {...form.getInputProps('description')}
                    />
                    <FileDropzone
                        label={tGlossary("articleFamily.photo")}
                        file={photoFile}
                        savedFilePath={selectedArticlefamily?.photoPath}
                        onChange={(photoFile) => setPhotoFile(photoFile)}
                        onClear={() => setPhotoFile(null)}
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