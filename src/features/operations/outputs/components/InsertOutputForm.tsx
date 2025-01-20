import { ChangeEvent, useState, useMemo, useEffect } from "react";
import { Avatar, Box, Button, Checkbox, Flex, Group, NumberInput, SimpleGrid, Stack, Table, Text, Textarea, Title, Tooltip, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { wait } from "../../../../utils/helpers";
import outputsService from "../services"
import inputsService from "../../inputs/services"
import { alertError, alertSuccess } from "../../../../utils/feedback";
import { useTranslation } from "react-i18next";
import useModal from "../../../../hooks/useModal";
import Input from "../../../../types/Input";
import { DateTimePicker, YearPickerInput } from "@mantine/dates";
import { MinusIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Owner from "../../../../types/Owner";
import ReadOnlyCombobox from "../../../../components/ReadOnlyCombobox";
import OwnerSelectOption from "../../../owners/shared/components/OwnerSelectOption";
import { useNavigate } from "react-router-dom";
import Sup from "../../../../components/Sup";
import { columnsWidth } from "../../shared/components/helpers";
import { getFullResourcePath } from "../../../../lib/axios/api";
import InputOperationLine from "../../../../types/InputOperationLine";
import OwnerSelectionModal from "../../../owners/shared/components/OwnerSelectionModal";
import IconButton from "../../../../components/IconButton";
import { SaveIcon } from "../../../../components/CustomIcon/SaveIcon";
import { dateDiffInDays } from "../../../../utils/date";
import { SummaryTable } from "../../shared/components/SummaryTable";
import { PencilIcon } from "../../../../components/CustomIcon/PencilIcon";
import { PencilOffIcon } from "../../../../components/CustomIcon/PencilOffIcon";
import { FULLY_OUT } from "../../../../types/ProcessingStatus";

const schema = z.object({
    number: z.number({ invalid_type_error: "Number is required" }),
    year: z.date({ invalid_type_error: "Year is required" }),
    dateTime: z.date({ invalid_type_error: "DateTime is required" }),
    ownerId: z.number().refine((value) => value !== -1, {
        message: 'Owner is required',
    }),
    nightCount: z.number({ invalid_type_error: "Night count is required" }),
    totalTransportFee: z.number({ invalid_type_error: "Total transport fee is required" }),
    totalPaymentAmountWithoutDiscount: z.number({ invalid_type_error: "Total payment amount without discount is required" }),
    discountAmount: z.number({ invalid_type_error: "Discount amount is required" }),
    discountObservation: z.string().nullable(),
    receiptNumber: z.number({ invalid_type_error: "Receipt number is required" }),
    receiptDateTime: z.date({ invalid_type_error: "Receipt dateTime is required" }),
    hasOutputOperationLines: z.boolean().refine(val => val, { // This will trigger the validation error is its 'false'
        message: "No items selected!",
    }),
    isNewInputOwnerSaved: z.boolean().refine(val => val, { // This will trigger the validation error is its 'false'
        message: "New input owner not saved!",
    })
});

export type FormData = z.infer<typeof schema>

export type InsertOutputDto = Omit<FormData, "year" | "dateTime" | "ownerId" | "receiptDateTime" | "hasOutputOperationLines" | "isNewInputOwnerSaved">
    & {
        outputOperationLines: {
            articleId: number,
            quantity: number,
            inputOperationLineId: number
        }[]
    }
    & { year: number, dateTime: string; receiptDateTime: string; inputId: number };

interface Props {
    input: Input
}

export default function InsertOutputForm({ input }: Props) {
    const navigate = useNavigate()
    const [isSubmitting, setSubmitting] = useState(false)
    const [savedOwnerId, setSavedOwnerId] = useState(input.owner.id)
    const [isSavingNewInputOwner, setSavingNewInputOwner] = useState(false)
    const [owner, setOwner] = useState<Owner | null>(input.owner)
    const [isTransportFeeAutoCalculated, setTransportFeeAutoCalculated] = useState(true)
    const [inputOperationLines, setInputOperationLines] = useState<(InputOperationLine & { checked: boolean, quantityToBeOutput: number })[]>(() => (
        input.inputOperationLines.map(l => ({ ...l, checked: false, quantityToBeOutput: l.remainingQuantity }))
    ))

    const nonFullyOutInputOperationLines = useMemo(() => inputOperationLines.filter(l => l.status !== FULLY_OUT), [inputOperationLines])

    const checkedInputOperationLines = useMemo(() => nonFullyOutInputOperationLines.filter(l => l.checked), [nonFullyOutInputOperationLines])

    const [isOwnerSelectionModalOpen, { open: openOwnerSelectionModal, close: closeOwnerSelectionModal }] = useModal()

    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            number: 0,
            year: new Date(input.year, 0, 1), // Month is 0-based (0 for January), Day is 1-based
            dateTime: new Date(input.dateTime),
            ownerId: input.owner.id || -1,
            nightCount: 1,
            totalTransportFee: 0,
            totalPaymentAmountWithoutDiscount: 0,
            discountAmount: 0,
            discountObservation: '',
            receiptNumber: 0,
            receiptDateTime: new Date(input.dateTime),
            hasOutputOperationLines: false,
            isNewInputOwnerSaved: true
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const insertOutputDto: InsertOutputDto = {
            number: data.number,
            year: data.year.getFullYear(),
            dateTime: data.dateTime.toISOString(),
            nightCount: data.nightCount,
            totalTransportFee: data.totalTransportFee,
            totalPaymentAmountWithoutDiscount: data.totalPaymentAmountWithoutDiscount,
            discountAmount: data.discountAmount,
            discountObservation: data.discountObservation,
            receiptNumber: data.receiptNumber,
            receiptDateTime: data.receiptDateTime.toISOString(),
            inputId: input.id,
            outputOperationLines: checkedInputOperationLines.map(line => ({
                inputOperationLineId: line.id,
                articleId: line.article.id,
                quantity: line.quantityToBeOutput
            }))
        }
        console.log(insertOutputDto);


        try {
            setSubmitting(true)
            await wait(2000)
            await outputsService.createOutput(insertOutputDto)
            alertSuccess("New output created successfully!")
            navigate('/outputs-management')
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    const handleSaveInputOwner = async () => {
        if (!owner) return;
        try {
            setSavingNewInputOwner(true)
            await wait(2000)
            const updatedInput = await inputsService.updateInputOwner(input.id, { newOwnerId: owner.id })
            setSavedOwnerId(updatedInput.data.owner.id)
            alertSuccess("Input owner updated successfully!")

            form.setFieldValue("isNewInputOwnerSaved", true)
            form.clearFieldError("isNewInputOwnerSaved")
        } catch (error) {
            console.log(error);
        } finally {
            setSavingNewInputOwner(false)
        }
    }

    const updateOwner = (newOwner: Owner | null) => {
        console.log(newOwner);
        setOwner(newOwner)
        if (newOwner) {
            form.setFieldValue("ownerId", newOwner.id)
            if (newOwner.id !== savedOwnerId)
                form.setFieldValue("isNewInputOwnerSaved", false)
            else {
                form.setFieldValue("isNewInputOwnerSaved", true)
                form.clearFieldError("isNewInputOwnerSaved")
            }
        }
        form.clearFieldError("ownerId")
    }

    const totalPaymentAmount = useMemo(() => (
        form.values.totalPaymentAmountWithoutDiscount - form.values.discountAmount
    ), [form.values.totalPaymentAmountWithoutDiscount, form.values.discountAmount])

    const toggleRow = (event: ChangeEvent<HTMLInputElement>, lineId: number) => {
        const checked = event.currentTarget.checked
        const newInputOperationLines = inputOperationLines.map(l => l.id === lineId ? { ...l, checked } : l)
        const checkedLinesCount = newInputOperationLines.filter(l => l.checked).length
        setInputOperationLines(newInputOperationLines)
        form.setFieldValue("hasOutputOperationLines", checkedLinesCount > 0)
    }

    const toggleAll = () => {
        const allChecked = nonFullyOutInputOperationLines.length !== checkedInputOperationLines.length
        const newInputOperationLines = inputOperationLines.map(l => l.status !== FULLY_OUT ? { ...l, checked: allChecked } : l)
        setInputOperationLines(newInputOperationLines)
        form.setFieldValue("hasOutputOperationLines", allChecked)
    }

    useEffect(() => {
        const totalWithoutTransportfee = checkedInputOperationLines.reduce(
            (accumulator, currentLine) => accumulator + form.values.nightCount * currentLine.nightlyAmount * (currentLine.article.articleFamily?.unitCalculation ? currentLine.quantityToBeOutput : 1),
            0
        )
        form.setFieldValue("totalPaymentAmountWithoutDiscount", totalWithoutTransportfee + form.values.totalTransportFee)
    }, [inputOperationLines, form.values.nightCount, form.values.totalTransportFee])

    useEffect(() => {
        if (isTransportFeeAutoCalculated) {
            const totalTransportfee = checkedInputOperationLines.reduce(
                (accumulator, currentLine) => accumulator + currentLine.transportFee,
                0
            )
            form.setFieldValue("totalTransportFee", totalTransportfee)
        }
    }, [inputOperationLines, isTransportFeeAutoCalculated])

    form.watch('dateTime', ({ previousValue, value, touched, dirty }) => {
        const difference = dateDiffInDays(new Date(input.dateTime), new Date(value));
        form.setFieldValue("nightCount", difference || 1)
        form.setFieldValue("receiptDateTime", value)
    });

    form.watch('discountAmount', ({ value }) => {
        if (value <= 0 || isNaN(value))
            form.setFieldValue("discountObservation", '')
    });

    return (
        <>
            <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack maw={950} mx="auto">
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <SimpleGrid cols={{ base: 2 }} spacing={5}>
                            <NumberInput
                                label={tGlossary("input.number")}
                                placeholder={tGlossary("input.number")}
                                value={input.number}
                                disabled
                            />
                            <NumberInput
                                leftSection={<MinusIcon style={{ width: rem(28), height: rem(28), rotate: "-60deg" }} />}
                                label={tGlossary("input.year")}
                                placeholder={tGlossary("input.year")}
                                value={input.year}
                                disabled
                            />
                        </SimpleGrid>
                        <DateTimePicker
                            label={tGlossary("input.dateTime")}
                            placeholder={tGlossary("input.dateTime")}
                            name="dateTime"
                            value={new Date(input.dateTime)}
                            valueFormat="DD/MM/YYYY - HH:mm"
                            disabled
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <SimpleGrid cols={{ base: 2 }} spacing={5}>
                            <NumberInput
                                label={tGlossary("output.number")}
                                placeholder={tGlossary("output.number")}
                                name="number"
                                withAsterisk
                                min={0}
                                {...form.getInputProps('number')}
                            />
                            <YearPickerInput
                                leftSection={<MinusIcon style={{ width: rem(28), height: rem(28), rotate: "-60deg" }} />}
                                label={tGlossary("output.year")}
                                placeholder={tGlossary("output.year")}
                                name="year"
                                clearable
                                withAsterisk
                                minDate={new Date(input.year, 0, 1)}
                                {...form.getInputProps('year')}
                            />
                        </SimpleGrid>
                        <DateTimePicker
                            label={tGlossary("output.dateTime")}
                            placeholder={tGlossary("output.dateTime")}
                            name="dateTime"
                            clearable
                            withAsterisk
                            minDate={new Date(input.dateTime)}
                            {...form.getInputProps('dateTime')}
                            valueFormat="DD/MM/YYYY - HH:mm"
                        />
                    </SimpleGrid>
                    <Flex gap="5">
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

                                    form.clearFieldError("isNewInputOwnerSaved")
                                }}
                                onClick={openOwnerSelectionModal}
                            >
                                {
                                    (owner) => <OwnerSelectOption owner={owner} />
                                }
                            </ReadOnlyCombobox>
                        </Box>
                        <Tooltip label={form.getInputProps(`isNewInputOwnerSaved`).error} opened={!!form.getInputProps(`isNewInputOwnerSaved`).error && !isSavingNewInputOwner} position="bottom" withArrow arrowSize={6} color="red" offset={-1}>
                            <Box>
                                <IconButton
                                    aria-label="Save new input owner"
                                    variant="default"
                                    disabled={isSavingNewInputOwner || form.values.isNewInputOwnerSaved}
                                    onClick={handleSaveInputOwner}
                                    loading={isSavingNewInputOwner}
                                >
                                    <SaveIcon style={{ width: rem(20), height: rem(20) }} />
                                </IconButton>
                            </Box>
                        </Tooltip>
                    </Flex>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                        <Stack>
                            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                                <NumberInput
                                    label={tGlossary("output.nightCount")}
                                    placeholder={tGlossary("output.nightCount")}
                                    name="nightCount"
                                    withAsterisk
                                    min={1}
                                    disabled
                                    {...form.getInputProps('nightCount')}
                                />
                                <Flex gap="5">
                                    <Box style={{ flexGrow: 1 }}>
                                        <NumberInput
                                            label={tGlossary("output.totalTransportFee")}
                                            placeholder={tGlossary("output.totalTransportFee")}
                                            name="totalTransportFee"
                                            withAsterisk
                                            min={0}
                                            disabled={isTransportFeeAutoCalculated}
                                            {...form.getInputProps('totalTransportFee')}
                                        />
                                    </Box>
                                    <Tooltip label={"Enable/Disable amount personalization"} position="bottom" withArrow arrowSize={6} color="indigo" offset={-1}>
                                        <Box>
                                            <IconButton
                                                aria-label="Enable/Disable amount personalization"
                                                variant="default"
                                                onClick={() => setTransportFeeAutoCalculated(prev => !prev)}
                                            >
                                                {
                                                    isTransportFeeAutoCalculated
                                                        ? <PencilIcon style={{ width: rem(20), height: rem(20) }} />
                                                        : <PencilOffIcon style={{ width: rem(20), height: rem(20) }} />
                                                }
                                            </IconButton>
                                        </Box>
                                    </Tooltip>
                                </Flex>
                            </SimpleGrid>
                            <NumberInput
                                label={tGlossary("output.totalPaymentAmountWithoutDiscount")}
                                placeholder={tGlossary("output.totalPaymentAmountWithoutDiscount")}
                                name="totalPaymentAmountWithoutDiscount"
                                withAsterisk
                                disabled
                                {...form.getInputProps('totalPaymentAmountWithoutDiscount')}
                            />
                            <NumberInput
                                label={tGlossary("output.discountAmount")}
                                placeholder={tGlossary("output.discountAmount")}
                                name="discountAmount"
                                withAsterisk
                                min={0}
                                {...form.getInputProps('discountAmount')}
                            />
                            {
                                !(form.values.discountAmount <= 0 || isNaN(form.values.discountAmount)) && (
                                    <Textarea
                                        label={tGlossary("output.discountObservation")}
                                        placeholder={tGlossary("output.discountObservation")}
                                        name="discountObservation"
                                        // withAsterisk
                                        disabled={form.values.discountAmount <= 0 || isNaN(form.values.discountAmount)}
                                        {...form.getInputProps('discountObservation')}
                                    />
                                )
                            }
                            <NumberInput
                                label={tGlossary("output.totalPaymentAmount")}
                                placeholder={tGlossary("output.totalPaymentAmount")}
                                name="totalPaymentAmount"
                                withAsterisk
                                min={0}
                                disabled
                                value={totalPaymentAmount}
                            />
                        </Stack>
                        <Stack>
                            <NumberInput
                                label={tGlossary("output.receiptNumber")}
                                placeholder={tGlossary("output.receiptNumber")}
                                name="receiptNumber"
                                withAsterisk
                                {...form.getInputProps('receiptNumber')}
                            />
                            <DateTimePicker
                                label={tGlossary("output.receiptDateTime")}
                                placeholder={tGlossary("output.receiptDateTime")}
                                name="receiptDateTime"
                                clearable
                                withAsterisk
                                {...form.getInputProps('receiptDateTime')}
                                valueFormat="DD/MM/YYYY - HH:mm"
                            />
                            <SummaryTable title={tGlossary("output.receiptAmount")}>
                                {totalPaymentAmount}
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

                    {
                        !!form.getInputProps(`hasOutputOperationLines`).error && (
                            <Text fz={"sm"} ta="center" style={{ color: 'var(--mantine-color-error)' }}>{form.getInputProps(`hasOutputOperationLines`).error}</Text>
                        )
                    }

                    <Table.ScrollContainer minWidth={950}>
                        <Table styles={{ table: { tableLayout: 'fixed' } }}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th style={{ width: 50, verticalAlign: "middle" }}>
                                        <Checkbox
                                            onChange={toggleAll}
                                            checked={checkedInputOperationLines.length === nonFullyOutInputOperationLines.length}
                                            indeterminate={checkedInputOperationLines.length > 0 && checkedInputOperationLines.length !== nonFullyOutInputOperationLines.length}
                                        />
                                    </Table.Th>
                                    <Table.Th style={{ width: columnsWidth.article }}>{tGlossary("inputOperationLine.article")}</Table.Th>
                                    <Table.Th style={{ width: columnsWidth.description }}>{tGlossary("inputOperationLine.description")}</Table.Th>
                                    <Table.Th ta="center">{tGlossary("inputOperationLine.nightlyAmount")}</Table.Th>
                                    <Table.Th ta="center">{tGlossary("inputOperationLine.remainingQuantity")}</Table.Th>
                                    <Table.Th ta="center">{tGlossary("outputOperationLine.quantity")}</Table.Th>
                                    <Table.Th ta="center">{tGlossary("inputOperationLine.transportFee")}</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody style={{ verticalAlign: 'top' }}>
                                {
                                    inputOperationLines.map((line, index) => {
                                        const isFullyOut = line.status === FULLY_OUT
                                        return (
                                            <Table.Tr key={index}
                                                opacity={isFullyOut ? 0.5 : 1}
                                            >
                                                <Table.Td style={{ width: 50, verticalAlign: "middle" }}>
                                                    <Checkbox
                                                        aria-label="Select row"
                                                        checked={line.checked}
                                                        onChange={(event) => toggleRow(event, line.id)}
                                                        disabled={isFullyOut}
                                                    />
                                                </Table.Td>
                                                <Table.Td style={{ width: columnsWidth.article }}>
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
                                                                <Text fz="xs" fw={700} truncate="end">
                                                                    {line.article.name}
                                                                </Text>
                                                            </Group>
                                                        </Group>
                                                    </Box>
                                                </Table.Td>
                                                <Table.Td style={{ width: columnsWidth.description }}>
                                                    <Flex h={36} align="center">
                                                        <Text fz="sm" fw={500} truncate="end" title={line.description}>
                                                            {line.description}
                                                        </Text>
                                                    </Flex>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Flex h={36} align="center" justify="center">
                                                        <Text>{line.nightlyAmount}{' '}<Sup>{tGlossary(`currency.tn`)}</Sup></Text>
                                                    </Flex>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Flex h={36} align="center" justify="center">
                                                        <Text>{line.remainingQuantity}</Text>
                                                    </Flex>
                                                </Table.Td>
                                                <Table.Td>
                                                    <NumberInput
                                                        placeholder={tGlossary("outputOperationLine.quantity")}
                                                        withAsterisk
                                                        min={isFullyOut ? 0 : 1}
                                                        max={line.remainingQuantity}
                                                        disabled={!line.checked}
                                                        value={line.quantityToBeOutput}
                                                        onChange={(value) => {
                                                            setInputOperationLines(prev => (
                                                                prev.map(
                                                                    l => l.id === line.id
                                                                        ? ({ ...line, quantityToBeOutput: Number(value) })
                                                                        : l
                                                                )
                                                            ))
                                                        }}
                                                    />
                                                </Table.Td>
                                                <Table.Td>
                                                    <Flex h={36} align="center" justify="center">
                                                        <Text>{line.transportFee}{' '}<Sup>{tGlossary(`currency.tn`)}</Sup></Text>
                                                    </Flex>
                                                </Table.Td>

                                            </Table.Tr>
                                        )
                                    })
                                }
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>

                </Stack>

            </form>

            <OwnerSelectionModal
                title={"Select owner"}
                isOpened={isOwnerSelectionModalOpen}
                onClose={closeOwnerSelectionModal}
                onSubmit={updateOwner}
            />
        </>
    )
}

