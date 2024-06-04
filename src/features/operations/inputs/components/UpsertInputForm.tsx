import { ReactNode, useState } from "react";
import { ActionIcon, Anchor, Avatar, Box, Button, Flex, Group, NumberInput, SimpleGrid, Stack, Table, Text, Title, rem } from "@mantine/core";
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
import { MinusIcon, PhotoIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Source from "../../../../types/Source";
import SourceSelectOption from "../../../sources/components/SourceSelectOption";
import UpsertSourceModal from "../../../sources/components/UpsertSourceModal";
import OwnerSelectionModal from "./OwnerSelectionModal";
import Owner from "../../../../types/Owner";
import ReadOnlyCombobox from "../../../../components/ReadOnlyCombobox";
import OwnerSelectOption from "../../../owners/shared/components/OwnerSelectOption";
import { getFullResourcePath } from "../../../../lib/axios/api";
import { useNavigate } from "react-router-dom";
import OperationLineSelectionModal from "./OperationLineSelectionModal";
import Sup from "../../../../components/Sup";


const schema = z.object({
    dateTime: z.date({ invalid_type_error: "DateTime is required" }),
    number: z.number({ invalid_type_error: "Number is required" }),
    year: z.number({ invalid_type_error: "Year is required" }),
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
    operationLines: z.array(
        z.object({
            article: z.object({
                id: z.number().refine((value) => value !== -1, {
                    message: 'Article is required',
                }),
                name: z.string(),
                photoPath: z.string().nullable(),
                articleFamily: z.object({
                    unitCalculation: z.boolean()
                })
            }),
            nightlyAmount: z.number({ invalid_type_error: "Nightly amount is required" }).gt(0, "Nightly amount should be greather than 0"),
            transportFee: z.number({ invalid_type_error: "Transport fee is required" }),
            quantity: z.number({ invalid_type_error: "Quantity is required" }).gt(0, "Quantity should be greather than 0"),
        })
    ).min(1, "List is empty!")
});

export type FormData = z.infer<typeof schema>

export type UpsertInputDto = Omit<FormData, "operationLines" | "dateTime">
    & {
        operationLines: {
            articleId: number;
            nightlyAmount: number;
            transportFee: number;
            quantity: number;
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
    // const [operationLines, setOperationLines] = useState<OperationLine[]>(selectedInput?.operationLines ?? [])

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
            registerId: selectedInput?.register.id || -1,
            subRegisterId: selectedInput?.subRegister.id || -1,
            sourceId: selectedInput?.source.id || -1,
            ownerId: selectedInput?.owner.id || -1,
            operationLines: selectedInput
                ? selectedInput.operationLines.map(line => ({
                    article: {
                        id: line.article.id,
                        name: line.article.name,
                        photoPath: line.article.photoPath,
                        articleFamily: {
                            unitCalculation: line.article.articleFamily?.unitCalculation!
                        }
                    },
                    nightlyAmount: line.nightlyAmount,
                    transportFee: line.transportFee,
                    quantity: line.quantity
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
            registerId: data.registerId,
            subRegisterId: data.subRegisterId,
            sourceId: data.sourceId,
            ownerId: data.ownerId,
            operationLines: data.operationLines.map(line => ({
                articleId: line.article.id,
                quantity: line.quantity,
                nightlyAmount: line.nightlyAmount,
                transportFee: line.transportFee,
            }))
        }
        console.log(upsertInputDto);


        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedInput) {
                await inputsService.updateInput(selectedInput.id, upsertInputDto)
                alertSuccess("Input updated successfully!")
            } else {
                await inputsService.createInput(upsertInputDto)
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

    const totalQuantity = form.getValues().operationLines.reduce(
        (accumulator, currentLine) => accumulator + currentLine.quantity,
        0,
    );

    const totalNightlyAmount = form.getValues().operationLines.reduce(
        (accumulator, currentLine) => accumulator + currentLine.quantity * currentLine.nightlyAmount,
        0,
    );

    const totalTransportFee = form.getValues().operationLines.reduce(
        (accumulator, currentLine) => accumulator + currentLine.transportFee,
        0,
    );


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
                                        <NumberInput
                                            label={tGlossary("input.number")}
                                            placeholder={tGlossary("input.number")}
                                            name="number"
                                            withAsterisk
                                            {...form.getInputProps('number')}
                                        />
                                    </Box>
                                    <Box style={{ flexGrow: 1 }}>
                                        <NumberInput
                                            leftSection={<MinusIcon style={{ width: rem(28), height: rem(28), rotate: "-60deg" }} />}
                                            label={tGlossary("input.year")}
                                            placeholder={tGlossary("input.year")}
                                            name="year"
                                            withAsterisk
                                            {...form.getInputProps('year')}
                                        />
                                    </Box>
                                </Flex>
                            </SimpleGrid>
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
                            <Box style={{ flexGrow: 1 }}>
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
                            </Box>
                        </Stack>
                        <Stack justify="center">
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
                                    <Table.Th style={{ width: 250 }}>{tGlossary("operationLine.article")}</Table.Th>
                                    <Table.Th>{tGlossary("operationLine.nightlyAmount")}</Table.Th>
                                    <Table.Th>{tGlossary("operationLine.quantity")}</Table.Th>
                                    <Table.Th ta="center">{tGlossary("operationLine.subTotalNightlyAmount")}</Table.Th>
                                    <Table.Th>{tGlossary("operationLine.transportFee")}</Table.Th>
                                    <Table.Th style={{ width: 50 }}></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody style={{ verticalAlign: 'top' }}>
                                {
                                    form.getValues().operationLines.map((line, index) => {
                                        return (
                                            <Table.Tr key={index}>
                                                <Table.Td style={{ width: 250 }}>
                                                    <Box style={{ flex: 1 }}>
                                                        <Group
                                                            wrap='nowrap' title={`${line.article.name}`}>
                                                            <Avatar
                                                                styles={{ root: { width: 36, height: 36, minWidth: 36 } }}
                                                                // style={{ border: "1px solid" }}
                                                                src={line.article.photoPath ? getFullResourcePath(line.article.photoPath) : ""}
                                                                radius={"sm"}
                                                            ><PhotoIcon style={{ width: "80%" }} /></Avatar>
                                                            <Group gap={"5px"} wrap='nowrap' className='text-truncate'>
                                                                <Text fz="xs" fw={700}>
                                                                    {line.article.name}
                                                                </Text>
                                                            </Group>
                                                        </Group>
                                                    </Box>
                                                </Table.Td>
                                                <Table.Td>
                                                    <NumberInput
                                                        placeholder="Unit price"
                                                        withAsterisk
                                                        key={form.key(`operationLines.${index}.nightlyAmount`)}
                                                        {...form.getInputProps(`operationLines.${index}.nightlyAmount`)}
                                                    />
                                                </Table.Td>
                                                <Table.Td>
                                                    <NumberInput
                                                        placeholder="Quantity"
                                                        withAsterisk
                                                        key={form.key(`operationLines.${index}.quantity`)}
                                                        {...form.getInputProps(`operationLines.${index}.quantity`)}
                                                    />
                                                </Table.Td>
                                                <Table.Td>
                                                    <Flex h={36} align="center" justify="center">
                                                        <Text>{line.nightlyAmount * line.quantity}{' '}<Sup>{tGlossary(`currency.tn`)}</Sup></Text>
                                                    </Flex>
                                                </Table.Td>
                                                <Table.Td>
                                                    <NumberInput
                                                        placeholder="Transport fee"
                                                        withAsterisk
                                                        key={form.key(`operationLines.${index}.transportFee`)}
                                                        {...form.getInputProps(`operationLines.${index}.transportFee`)}
                                                    />
                                                </Table.Td>
                                                <Table.Td style={{ width: 50 }}>
                                                    <ActionIcon variant="subtle" color="red" size="input-sm" onClick={() => form.removeListItem('operationLines', index)}>
                                                        <TrashIcon width="1rem" height="1rem" />
                                                    </ActionIcon>
                                                </Table.Td>
                                            </Table.Tr>
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
                    <Text fz={"sm"} ta="center" style={{ color: 'var(--mantine-color-error)' }}>{form.getInputProps(`operationLines`).error}</Text>


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

            <OperationLineSelectionModal
                title={"Select operation line"}
                isOpened={isOperationLineSelectionModalOpen}
                onClose={closeOperationLineSelectionModal}
                onSubmit={(operationLineDto) => {
                    console.log(operationLineDto);
                    if (operationLineDto.article) {
                        const articleExists = !!form.getValues().operationLines.find(line => line.article.id === operationLineDto.article.id)
                        if (articleExists) {
                            alertError("the item is already selected!")
                            return;
                        }
                        form.clearFieldError("operationLines")
                        form.insertListItem("operationLines", operationLineDto)
                    }
                }}
            />
        </>
    )
}

interface SummaryTableProps {
    title: string
    children: ReactNode
}

function SummaryTable({ title, children }: SummaryTableProps) {
    return (
        <Box pl={{ base: 0, md: 'xl' }}>
            <table style={{ tableLayout: 'fixed', width: "100%", margin: '25px auto 0' }}>
                <tbody>
                    <tr>
                        <td style={{ width: "60%" }}><Text fw="700">{title}</Text></td>
                        <td style={{ width: "40%", paddingLeft: 40 }}>
                            <Text fw="700">{children}</Text>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Box>
    )
}