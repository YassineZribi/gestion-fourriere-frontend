import { ReactNode, useState } from "react";
import { ActionIcon, Box, Button, Flex, Group, NumberInput, SimpleGrid, Stack, Table, Text, TextInput, Title, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { wait } from "../../../../utils/helpers";
import inputsService from "../services"
import registersService from '../../../registers/services'
import sourcesService from '../../../sources/services'
import subRegistersService from '../../../sub-registers/services'
import { alertError, alertSuccess } from "../../../../utils/feedback";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../../components/SearchableCombobox";
import SubRegister from "../../../../types/SubRegister";
import RegisterSelectOption from "../../../registers/components/RegisterSelectOption";
import UpsertRegisterModal from "../../../registers/components/UpsertRegisterModal";
import useModal from "../../../../hooks/useModal";
import Register from "../../../../types/Register";
import PlusIconButton from "../../../../components/PlusIconButton";
import Input from "../../../../types/Input";
import SubRegisterSelectOption from "../../../sub-registers/components/SubRegisterSelectOption";
import UpsertSubRegisterModal from "../../../sub-registers/components/UpsertSubRegisterModal";
import { DateTimePicker } from "@mantine/dates";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Source from "../../../../types/Source";
import SourceSelectOption from "../../../sources/components/SourceSelectOption";
import UpsertSourceModal from "../../../sources/components/UpsertSourceModal";
import OwnerSelectionModal from "../../../owners/shared/components/OwnerSelectionModal";
import Owner from "../../../../types/Owner";
import ReadOnlyCombobox from "../../../../components/ReadOnlyCombobox";
import OwnerSelectOption from "../../../owners/shared/components/OwnerSelectOption";
import { useNavigate } from "react-router-dom";
import UpsertInputOperationLineModal, { InputOperationLineDto } from "./UpsertInputOperationLineModal";
import Sup from "../../../../components/Sup";
import InputOperationLineTRow from "./InputOperationLineTRow";
import { columnsWidth } from "../../shared/components/helpers";
import { SummaryTable } from "../../shared/components/SummaryTable";
import Map, { SFAX_COORDS } from "../../../../components/Map";


const schema = z.object({
    dateTime: z.date({ invalid_type_error: "DateTime is required" }),
    number: z.number({ invalid_type_error: "Number is required" }),
    year: z.number({ invalid_type_error: "Year is required" }),
    address: z.string().min(1, 'Address is required'),
    latitude: z.number({ invalid_type_error: "Latitude is required" }),
    longitude: z.number({ invalid_type_error: "Longitude is required" }),
    registerId: z.number().refine((value) => value !== -1, {
        message: 'Register is required',
    }),
    subRegisterId: z.number().refine((value) => value !== -1, {
        message: 'SubRegister is required',
    }),
    sourceId: z.number().refine((value) => value !== -1, {
        message: 'Source is required',
    }),
    ownerId: z.number().refine((value) => value !== -1, {
        message: 'Owner is required',
    }),
    inputOperationLines: z.array(
        z.object({
            articleId: z.number().refine((value) => value !== -1, {
                message: 'Article is required',
            }),
        })
    ).min(1, "List is empty!")
});

export type FormData = z.infer<typeof schema>

export type UpsertInputDto = Omit<FormData, "inputOperationLines" | "dateTime">
    & {
        inputOperationLines: {
            articleId: number;
            quantity: number;
            nightlyAmount: number;
            transportFee: number;
            description: string;
            observation: string | null;
            note: string | null;
            photoFile: File | null;
            photoPath: string | null;
        }[]
    }
    & { dateTime: string };

interface Props {
    selectedInput: Input | null
}

export default function UpsertInputForm({ selectedInput }: Props) {
    const navigate = useNavigate()
    const [isSubmitting, setSubmitting] = useState(false)
    const [register, setRegister] = useState(selectedInput?.register ?? null)
    const [subRegister, setSubRegister] = useState(selectedInput?.subRegister ?? null)
    const [source, setSource] = useState(selectedInput?.source ?? null)
    const [owner, setOwner] = useState(selectedInput?.owner ?? null)
    const [inputOperationLines, setInputOperationLines] = useState<InputOperationLineDto[]>(() => (
        selectedInput
            ? selectedInput.inputOperationLines.map(line => ({
                article: line.article,
                quantity: line.quantity,
                nightlyAmount: line.nightlyAmount,
                subTotalNightlyAmount: line.nightlyAmount * line.quantity,
                transportFee: line.transportFee,
                description: line.description,
                observation: line.observation,
                note: line.note,
                photoFile: null,
                photoPath: line.photoPath
            }))
            : []
    ))

    const [isRegisterModalOpen, { open: openRegisterModal, close: closeRegisterModal }] = useModal()
    const [isSubRegisterModalOpen, { open: openSubRegisterModal, close: closeSubRegisterModal }] = useModal()
    const [isSourceModalOpen, { open: openSourceModal, close: closeSourceModal }] = useModal()
    const [isOwnerSelectionModalOpen, { open: openOwnerSelectionModal, close: closeOwnerSelectionModal }] = useModal()
    const [isOperationLineSelectionModalOpen, { open: openOperationLineSelectionModal, close: closeOperationLineSelectionModal }] = useModal()

    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            dateTime: selectedInput ? new Date(selectedInput.dateTime) : new Date(),
            number: selectedInput?.number || 0,
            year: selectedInput?.year || new Date().getFullYear(),
            address: selectedInput?.address || '',
            latitude: selectedInput?.latitude || SFAX_COORDS.lat,
            longitude: selectedInput?.longitude || SFAX_COORDS.lng,
            registerId: selectedInput?.register.id || -1,
            subRegisterId: selectedInput?.subRegister.id || -1,
            sourceId: selectedInput?.source.id || -1,
            ownerId: selectedInput?.owner.id || -1,
            inputOperationLines: selectedInput
                ? selectedInput.inputOperationLines.map(line => ({
                    articleId: line.article.id,
                }))
                : []
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const upsertInputDto: UpsertInputDto = {
            dateTime: data.dateTime.toISOString(),
            number: data.number,
            year: data.year,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
            registerId: data.registerId,
            subRegisterId: data.subRegisterId,
            sourceId: data.sourceId,
            ownerId: data.ownerId,
            inputOperationLines: inputOperationLines.map(line => ({
                articleId: line.article.id,
                quantity: line.quantity,
                nightlyAmount: line.nightlyAmount,
                transportFee: line.transportFee,
                description: line.description,
                observation: line.observation,
                note: line.note,
                photoFile: line.photoFile,
                photoPath: line.photoPath
            }))
        }
        console.log(upsertInputDto);

        const formData = new FormData()

        formData.append("dateTime", upsertInputDto.dateTime);
        formData.append("number", String(upsertInputDto.number));
        formData.append("year", String(upsertInputDto.year));
        formData.append("address", upsertInputDto.address);
        formData.append("latitude", String(upsertInputDto.latitude));
        formData.append("longitude", String(upsertInputDto.longitude));
        formData.append("registerId", String(upsertInputDto.registerId));
        formData.append("subRegisterId", String(upsertInputDto.subRegisterId));
        formData.append("sourceId", String(upsertInputDto.sourceId));
        formData.append("ownerId", String(upsertInputDto.ownerId));

        upsertInputDto.inputOperationLines.forEach((line, index) => {
            formData.append(`inputOperationLines[${index}].articleId`, String(line.articleId));
            formData.append(`inputOperationLines[${index}].quantity`, String(line.quantity));
            formData.append(`inputOperationLines[${index}].nightlyAmount`, String(line.nightlyAmount));
            formData.append(`inputOperationLines[${index}].transportFee`, String(line.transportFee));
            formData.append(`inputOperationLines[${index}].description`, String(line.description));
            formData.append(`inputOperationLines[${index}].observation`, String(line.observation || ''));
            formData.append(`inputOperationLines[${index}].note`, String(line.note || ''));
            if (line.photoFile !== null) {
                formData.append(`inputOperationLines[${index}].photoFile`, line.photoFile);
            }
            if (line.photoFile == null && line.photoPath == null) {
                formData.append(`inputOperationLines[${index}].deletePhotoFileIfExists`, String(true));
            }
        });


        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedInput) {
                await inputsService.updateInput(selectedInput.id, formData)
                alertSuccess("Input updated successfully!")
            } else {
                await inputsService.createInput(formData)
                alertSuccess("New input created successfully!")
                navigate('/inputs-management')
                //form.reset()
                //setRegister(null)
            }

            // onSubmit()
            // onClose()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    const updateRegister = (newRegister: Register | null) => {
        setRegister(newRegister)
        if (newRegister) {
            setSubRegister(null)
            form.setFieldValue("registerId", newRegister.id)
        }
        form.clearFieldError("registerId")
    }

    const updateSubRegister = (newSubRegister: SubRegister | null) => {
        setSubRegister(newSubRegister)
        if (newSubRegister) {
            form.setFieldValue("subRegisterId", newSubRegister.id)
        }
        form.clearFieldError("subRegisterId")
    }

    const updateSource = (newSource: Source | null) => {
        setSource(newSource)
        if (newSource) {
            form.setFieldValue("sourceId", newSource.id)
        }
        form.clearFieldError("sourceId")
    }

    const updateOwner = (newOwner: Owner | null) => {
        console.log(newOwner);
        setOwner(newOwner)
        if (newOwner) {
            form.setFieldValue("ownerId", newOwner.id)
        }
        form.clearFieldError("ownerId")
    }

    console.log(form.values);

    const totalQuantity = inputOperationLines.reduce(
        (accumulator, currentLine) => accumulator + currentLine.quantity,
        0,
    );

    const totalNightlyAmount = inputOperationLines.reduce(
        (accumulator, currentLine) => accumulator + currentLine.quantity * currentLine.nightlyAmount,
        0,
    );

    const totalTransportFee = inputOperationLines.reduce(
        (accumulator, currentLine) => accumulator + currentLine.transportFee,
        0,
    );

    const handleDeleteInputOperationLine = (index: number) => {
        form.removeListItem('inputOperationLines', index)
        setInputOperationLines(prev => prev.filter((l, i) => i !== index))
    }

    const handleUpdateInputOperationLine = (inputOperationLineDto: InputOperationLineDto, index: number) => {
        const articleExists = !!inputOperationLines.find((line, i) => line.article.id === inputOperationLineDto.article.id && i !== index)
        if (articleExists) {
            alertError("the item is already selected!")
            return;
        }
        //form.clearFieldError("inputOperationLines")
        form.removeListItem("inputOperationLines", index)
        form.insertListItem("inputOperationLines", { articleId: inputOperationLineDto.article.id }, index)
        setInputOperationLines(prev => prev.map((l, i) => i === index ? inputOperationLineDto : l))
    }

    return (
        <>
            <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack maw={950} mx="auto">
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                        <Stack>
                            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                                <Flex gap="5">
                                    <Box style={{ flexGrow: 1 }}>
                                        <SearchableCombobox
                                            selectedEntity={register}
                                            placeholder={tGlossary("input.register")}
                                            label={tGlossary("input.register")}
                                            error={form.errors.registerId?.toString()}
                                            withAsterisk
                                            onFetch={registersService.getAllRegistersByName}
                                            onSelectOption={updateRegister}
                                            onClear={() => {
                                                setRegister(null)
                                                setSubRegister(null)
                                                form.setFieldValue("registerId", -1)
                                                form.clearFieldError("registerId")
                                            }}
                                        >
                                            {
                                                (register) => <RegisterSelectOption register={register} />
                                            }
                                        </SearchableCombobox>
                                    </Box>
                                    <PlusIconButton
                                        aria-label="Add new register"
                                        onClick={openRegisterModal}
                                    />
                                </Flex>
                                <Flex gap="5">
                                    <Box style={{ flexGrow: 1 }}>
                                        <SearchableCombobox
                                            selectedEntity={subRegister}
                                            placeholder={tGlossary("input.subRegister")}
                                            label={tGlossary("input.subRegister")}
                                            error={form.errors.subRegisterId?.toString()}
                                            disabled={!register}
                                            withAsterisk
                                            onFetch={(name) => {
                                                if (register) return subRegistersService.getAllSubRegistersByNameAndRegisterId(name, register.id)
                                                return subRegistersService.getAllSubRegistersByName(name)
                                            }}
                                            onSelectOption={updateSubRegister}
                                            onClear={() => {
                                                setSubRegister(null)
                                                form.setFieldValue("subRegisterId", -1)
                                                form.clearFieldError("subRegisterId")
                                            }}
                                            shouldClearOption={!subRegister}
                                        >
                                            {
                                                (subRegister) => <SubRegisterSelectOption subRegister={subRegister} />
                                            }
                                        </SearchableCombobox>
                                    </Box>
                                    <PlusIconButton
                                        aria-label="Add new sub-register"
                                        disabled={!register}
                                        onClick={openSubRegisterModal}
                                    />
                                </Flex>
                            </SimpleGrid>
                            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                                <NumberInput
                                    label={tGlossary("input.number")}
                                    placeholder={tGlossary("input.number")}
                                    name="number"
                                    withAsterisk
                                    {...form.getInputProps('number')}
                                />
                                <NumberInput
                                    leftSection={<MinusIcon style={{ width: rem(28), height: rem(28), rotate: "-60deg" }} />}
                                    label={tGlossary("input.year")}
                                    placeholder={tGlossary("input.year")}
                                    name="year"
                                    withAsterisk
                                    {...form.getInputProps('year')}
                                />
                            </SimpleGrid>
                            <TextInput
                                label={tGlossary("input.address")}
                                placeholder={tGlossary("input.address")}
                                name="address"
                                withAsterisk
                                {...form.getInputProps('address')}
                            />
                            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                                <NumberInput
                                    label={tGlossary("input.latitude")}
                                    placeholder={tGlossary("input.latitude")}
                                    name="latitude"
                                    withAsterisk
                                    {...form.getInputProps('latitude')}
                                />
                                <NumberInput
                                    label={tGlossary("input.longitude")}
                                    placeholder={tGlossary("input.longitude")}
                                    name="longitude"
                                    withAsterisk
                                    {...form.getInputProps('longitude')}
                                />
                            </SimpleGrid>
                            <Map
                                position={{
                                    lat: form.values.latitude,
                                    lng: form.values.longitude
                                }}
                                onPositionChange={(coords) => {
                                    form.setFieldValue("latitude", coords.lat)
                                    form.setFieldValue("longitude", coords.lng)
                                }}
                            />
                        </Stack>
                        <Stack>
                            <DateTimePicker
                                label={tGlossary("input.dateTime")}
                                placeholder={tGlossary("input.dateTime")}
                                name="dateTime"
                                clearable
                                withAsterisk
                                {...form.getInputProps('dateTime')}
                                valueFormat="DD/MM/YYYY - HH:mm"
                            />
                            <Flex gap="5">
                                <Box style={{ flexGrow: 1 }}>
                                    <SearchableCombobox
                                        selectedEntity={source}
                                        placeholder={tGlossary("input.source")}
                                        label={tGlossary("input.source")}
                                        error={form.errors.sourceId?.toString()}
                                        withAsterisk
                                        onFetch={sourcesService.getAllSourcesByName}
                                        onSelectOption={updateSource}
                                        onClear={() => {
                                            setSource(null)
                                            form.setFieldValue("sourceId", -1)
                                            form.clearFieldError("sourceId")
                                        }}
                                    >
                                        {
                                            (source) => <SourceSelectOption source={source} />
                                        }
                                    </SearchableCombobox>
                                </Box>
                                <PlusIconButton
                                    aria-label="Add new source"
                                    onClick={openSourceModal}
                                />
                            </Flex>
                            {/* <Box style={{ flexGrow: 1 }}> */}
                            <ReadOnlyCombobox
                                selectedEntity={owner}
                                placeholder={tGlossary("input.owner")}
                                label={tGlossary("input.owner")}
                                error={form.errors.ownerId?.toString()}
                                withAsterisk
                                onClear={() => {
                                    setOwner(null)
                                    form.setFieldValue("ownerId", -1)
                                    form.clearFieldError("ownerId")
                                }}
                                onClick={openOwnerSelectionModal}
                            >
                                {
                                    (owner) => <OwnerSelectOption owner={owner} />
                                }
                            </ReadOnlyCombobox>
                            {/* </Box> */}
                            <SummaryTable title={t("components.upsertInputForm.totalQuantity")}>
                                {totalQuantity}
                            </SummaryTable>
                            <SummaryTable title={t("components.upsertInputForm.totalNightlyAmount")}>
                                {totalNightlyAmount}
                                {' '}<Sup style={{ fontWeight: 500 }}>{tGlossary(`currency.tn`)}</Sup>
                            </SummaryTable>
                            <SummaryTable title={t("components.upsertInputForm.totalTransportFee")}>
                                {totalTransportFee}
                                {' '}<Sup style={{ fontWeight: 500 }}>{tGlossary(`currency.tn`)}</Sup>
                            </SummaryTable>
                        </Stack>
                    </SimpleGrid>

                    <Group align="center" mt={"xl"} justify="space-between">
                        <Title order={3} fs="italic">{t("components.upsertInputForm.operationLinesTable.title")}</Title>
                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                            {t("buttons.save")}
                        </Button>
                    </Group>

                    <Table.ScrollContainer minWidth={950}>
                        <Table styles={{ table: { tableLayout: 'fixed' } }}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th style={{ width: columnsWidth.article }}>{tGlossary("inputOperationLine.article")}</Table.Th>
                                    <Table.Th style={{ width: columnsWidth.description }}>{tGlossary("inputOperationLine.description")}</Table.Th>
                                    <Table.Th ta="center">{tGlossary("inputOperationLine.nightlyAmount")}</Table.Th>
                                    <Table.Th ta="center">{tGlossary("inputOperationLine.quantity")}</Table.Th>
                                    <Table.Th ta="center">{tGlossary("inputOperationLine.subTotalNightlyAmount")}</Table.Th>
                                    <Table.Th ta="center">{tGlossary("inputOperationLine.transportFee")}</Table.Th>
                                    <Table.Th style={{ width: 100 }}></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody style={{ verticalAlign: 'top' }}>
                                {
                                    inputOperationLines.map((line, index) => {
                                        return (
                                            <InputOperationLineTRow
                                                key={index}
                                                inputOperationLine={line}
                                                onDeleteInputOperationLine={() => handleDeleteInputOperationLine(index)}
                                                onUpdateInputOperationLine={(inputOperationLine) => handleUpdateInputOperationLine(inputOperationLine, index)}
                                            />
                                        )
                                    })
                                }
                                <Table.Tr>
                                    <Table.Td>
                                        <ActionIcon onClick={openOperationLineSelectionModal} size={"input-sm"} variant="light" aria-label="Add operation line">
                                            <PlusIcon style={{ width: rem(20), height: rem(20) }} />
                                        </ActionIcon>
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                    <Text fz={"sm"} ta="center" style={{ color: 'var(--mantine-color-error)' }}>{form.getInputProps(`inputOperationLines`).error}</Text>


                    {/* <Group justify="flex-end" mt="md">
                        <Anchor component="button" type="button" variant="gradient" size="sm">
                            {t("buttons.cancel")}
                        </Anchor>
                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                            {t("buttons.save")}
                        </Button>
                    </Group> */}
                </Stack>

            </form>

            <UpsertRegisterModal
                title={t("components.upsertRegisterModal.title.onInsert")}
                isOpened={isRegisterModalOpen}
                onClose={closeRegisterModal}
                onSubmit={updateRegister}
            />

            <UpsertSubRegisterModal
                title={t("components.upsertSubRegisterModal.title.onInsert")}
                isOpened={isSubRegisterModalOpen}
                selectedRegister={register}
                disableRegister
                onClose={closeSubRegisterModal}
                onSubmit={updateSubRegister}
            />

            <UpsertSourceModal
                title={t("components.upsertSourceModal.title.onInsert")}
                isOpened={isSourceModalOpen}
                onClose={closeSourceModal}
                onSubmit={updateSource}
            />

            <OwnerSelectionModal
                title={"Select owner"}
                isOpened={isOwnerSelectionModalOpen}
                onClose={closeOwnerSelectionModal}
                onSubmit={updateOwner}
            />

            <UpsertInputOperationLineModal
                title={t("components.upsertInputOperationLineModal.title.onInsert")}
                isOpened={isOperationLineSelectionModalOpen}
                onClose={closeOperationLineSelectionModal}
                onSubmit={(inputOperationLineDto) => {
                    console.log(inputOperationLineDto);
                    if (inputOperationLineDto.article) {
                        const articleExists = !!inputOperationLines.find(line => line.article.id === inputOperationLineDto.article.id)
                        if (articleExists) {
                            alertError("the item is already selected!")
                            return;
                        }
                        form.clearFieldError("inputOperationLines")
                        form.insertListItem("inputOperationLines", { articleId: inputOperationLineDto.article.id })
                        setInputOperationLines(prev => [...prev, inputOperationLineDto])
                    }
                }}
            />
        </>
    )
}

