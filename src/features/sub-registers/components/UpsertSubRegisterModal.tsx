import { useState } from "react";
import { ActionIcon, Anchor, Box, Button, Flex, Group, Modal, ModalBaseProps, Stack, TextInput, Textarea, rem } from "@mantine/core";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { wait } from "../../../utils/helpers";
import subRegistersService from "../services"
import registersService from '../../registers/services'
import { alertSuccess } from "../../../utils/feedback";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../components/SearchableCombobox";
import SubRegister from "../../../types/SubRegister";
import RegisterSelectOption from "../../registers/components/RegisterSelectOption";
import UpsertRegisterModal from "../../registers/components/UpsertRegisterModal";
import useModal from "../../../hooks/useModal";


const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    registerId: z.number().refine((value) => value !== -1, {
        message: 'Register is required',
    })
});

export type FormData = z.infer<typeof schema>

export type UpsertSubRegisterDto = FormData

interface Props {
    title: string
    size?: ModalBaseProps['size']
    isOpened: boolean
    selectedSubRegister?: SubRegister
    onClose: () => void
    onSubmit: () => void
}

export default function UpsertSubRegisterModal({ title, size = "lg", isOpened, selectedSubRegister, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const [register, setRegister] = useState(selectedSubRegister?.register ?? null)

    const [isRegisterModalOpen, { open: openRegisterModal, close: closeRegisterModal }] = useModal()

    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            name: selectedSubRegister?.name || '',
            description: selectedSubRegister?.description || '',
            registerId: selectedSubRegister?.register.id || -1
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const upsertSubRegisterDto: UpsertSubRegisterDto = {
            name: data.name,
            description: data.description,
            registerId: data.registerId
        }
        console.log(upsertSubRegisterDto);


        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedSubRegister) {
                await subRegistersService.updateSubRegister(selectedSubRegister.id, upsertSubRegisterDto)
                alertSuccess("Sub-register updated successfully!")
            } else {
                await subRegistersService.createSubRegister(upsertSubRegisterDto)
                alertSuccess("New sub-register created successfully!")
                form.reset()
                setRegister(null)
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
        <>
            <Modal size={size} title={title} opened={isOpened} onClose={onClose} closeOnClickOutside={false}>
                <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput
                            data-autofocus
                            label={tGlossary("subRegister.name")}
                            placeholder={tGlossary("subRegister.name")}
                            name="name"
                            withAsterisk
                            {...form.getInputProps('name')}
                        />
                        <Textarea
                            label={tGlossary("subRegister.description")}
                            placeholder={tGlossary("subRegister.description")}
                            name="description"
                            withAsterisk
                            {...form.getInputProps('description')}
                        />
                        <Flex align="flex-end" gap="5">
                            <Box style={{ flexGrow: 1 }}>
                                <SearchableCombobox
                                    selectedEntity={register}
                                    placeholder={tGlossary("subRegister.register")}
                                    label={tGlossary("subRegister.register")}
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
                            </Box>
                            <ActionIcon variant="default" aria-label="Add new employee" size="input-sm" onClick={openRegisterModal}>
                                <PlusIcon style={{ width: rem(14) }} />
                            </ActionIcon>
                        </Flex>
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" variant="gradient" onClick={onClose} size="sm">
                            {t("buttons.cancel")}
                        </Anchor>
                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                            Save
                        </Button>
                    </Group>
                </form>
            </Modal>

            <UpsertRegisterModal
                title={t("components.upsertRegisterModal.title.onInsert")}
                isOpened={isRegisterModalOpen}
                onClose={closeRegisterModal}
                onSubmit={(newRegister) => {
                    setRegister(newRegister)
                    if (newRegister) {
                        form.setFieldValue("registerId", newRegister.id)
                    }
                    form.clearFieldError("registerId")
                }}
            />
        </>
    )
}