import { useEffect, useState } from "react";
import { Anchor, Box, Button, Flex, Group, Modal, ModalBaseProps, Stack, TextInput, Textarea } from "@mantine/core";
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
import Register from "../../../types/Register";
import PlusIconButton from "../../../components/PlusIconButton";


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
    selectedRegister?: Register | null
    disableRegister?: boolean
    onClose: () => void
    onSubmit: (savedSubRegister: SubRegister) => void
}

export default function UpsertSubRegisterModal({ title, size = "lg", isOpened, selectedSubRegister, selectedRegister, disableRegister = false, onClose, onSubmit }: Props) {
    
    const [isSubmitting, setSubmitting] = useState(false)
    const [register, setRegister] = useState(selectedSubRegister?.register || selectedRegister || null)

    const [isRegisterModalOpen, { open: openRegisterModal, close: closeRegisterModal }] = useModal()

    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    useEffect(() => {
        if (selectedRegister)
            updateRegister(selectedRegister)
    }, [selectedRegister])

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

        let savedSubRegister: SubRegister;

        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedSubRegister) {
                const res = await subRegistersService.updateSubRegister(selectedSubRegister.id, upsertSubRegisterDto)
                savedSubRegister = res.data
                alertSuccess("Sub-register updated successfully!")
            } else {
                const res = await subRegistersService.createSubRegister(upsertSubRegisterDto)
                savedSubRegister = res.data
                alertSuccess("New sub-register created successfully!")
                form.reset()
                setRegister(null)
            }

            onSubmit(savedSubRegister)
            onClose()
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
                        <Flex gap="5">
                            <Box style={{ flexGrow: 1 }}>
                                <SearchableCombobox
                                    selectedEntity={register}
                                    placeholder={tGlossary("subRegister.register")}
                                    label={tGlossary("subRegister.register")}
                                    error={form.errors.registerId?.toString()}
                                    disabled={disableRegister}
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
                                disabled={disableRegister}
                                onClick={openRegisterModal}
                            />
                        </Flex>
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

            <UpsertRegisterModal
                title={t("components.upsertRegisterModal.title.onInsert")}
                isOpened={isRegisterModalOpen}
                onClose={closeRegisterModal}
                onSubmit={updateRegister}
            />
        </>
    )
}