import { useState } from "react";
import { Anchor, Box, Button, Flex, Group, Modal, NumberInput, SimpleGrid, Stack, TextInput, Textarea, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { wait } from "../../../../utils/helpers";
import inputsService from "../services"
import registersService from '../../../registers/services'
import sourcesService from '../../../sources/services'
import subRegistersService from '../../../sub-registers/services'
import { alertSuccess } from "../../../../utils/feedback";
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
import { MinusIcon } from "@heroicons/react/24/outline";
import Source from "../../../../types/Source";
import SourceSelectOption from "../../../sources/components/SourceSelectOption";
import UpsertSourceModal from "../../../sources/components/UpsertSourceModal";
import OwnerSelectionModal from "./OwnerSelectionModal";
import Owner from "../../../../types/Owner";
import ReadOnlyCombobox from "../../../../components/ReadOnlyCombobox";
import OwnerSelectOption from "../../../owners/shared/components/OwnerSelectOption";


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
});

export type FormData = z.infer<typeof schema>

export type UpsertInputDto = FormData

interface Props {
    selectedInput?: Input
}

export default function UpsertInputForm({ selectedInput }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const [register, setRegister] = useState(selectedInput?.register ?? null)
    const [subRegister, setSubRegister] = useState(selectedInput?.subRegister ?? null)
    const [source, setSource] = useState(selectedInput?.source ?? null)
    const [owner, setOwner] = useState(selectedInput?.owner ?? null)

    const [isRegisterModalOpen, { open: openRegisterModal, close: closeRegisterModal }] = useModal()
    const [isSubRegisterModalOpen, { open: openSubRegisterModal, close: closeSubRegisterModal }] = useModal()
    const [isSourceModalOpen, { open: openSourceModal, close: closeSourceModal }] = useModal()
    const [isOwnerSelectionModalOpen, { open: openOwnerSelectionModal, close: closeOwnerSelectionModal }] = useModal()

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
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const upsertInputDto: UpsertInputDto = {
            dateTime: data.dateTime,
            number: data.number,
            year: data.year,
            registerId: data.registerId,
            subRegisterId: data.subRegisterId,
            sourceId: data.sourceId,
            ownerId: data.ownerId
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
                form.reset()
                setRegister(null)
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

    return (
        <>
            <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack maw={700} mx="auto">
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
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
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <DateTimePicker
                            label={tGlossary("input.dateTime")}
                            placeholder={tGlossary("input.dateTime")}
                            name="dateTime"
                            clearable
                            withAsterisk
                            {...form.getInputProps('dateTime')}
                            valueFormat="DD/MM/YYYY - HH:mm"
                        // value={date}
                        // onChange={newDate => {
                        //     if (newDate !== null)
                        //         setDate(newDate)
                        //     console.log(newDate?.toISOString());

                        // }}
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

                    <TextInput
                        label={tGlossary("subRegister.name")}
                        placeholder={tGlossary("subRegister.name")}
                        name="name"
                        withAsterisk
                        {...form.getInputProps('name')}
                    />

                    <NumberInput
                        label={tGlossary("articleFamily.nightlyAmount")}
                        placeholder={tGlossary("articleFamily.nightlyAmount")}
                        name="number"
                        withAsterisk
                        {...form.getInputProps('number')}
                    />
                <Group justify="space-between" mt="md">
                    <Anchor component="button" type="button" variant="gradient" /* onClick={onClose} */ size="sm">
                        {t("buttons.cancel")}
                    </Anchor>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                        {t("buttons.save")}
                    </Button>
                </Group>
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
        </>
    )
}