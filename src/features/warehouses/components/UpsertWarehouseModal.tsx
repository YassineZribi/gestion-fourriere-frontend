import { useState } from "react";
import { Anchor, Box, Button, Flex, Group, Modal, ModalBaseProps, NumberInput, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { wait } from "../../../utils/helpers";
import warehousesService from "../services"
import employeesService from '../../users/employees/services'
import { alertSuccess } from "../../../utils/feedback";
import Warehouse from "../../../types/Warehouse";
import Map, { SFAX_COORDS } from "../../../components/Map";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../components/SearchableCombobox";
import EmployeeSelectOption from "../../users/employees/components/EmployeeSelectOption";
import UpsertEmployeeModal from "../../users/employees/components/UpsertEmployeeModal";
import useModal from "../../../hooks/useModal";
import PlusIconButton from "../../../components/PlusIconButton";


const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    latitude: z.number({ invalid_type_error: "Latitude is required" }),
    longitude: z.number({ invalid_type_error: "Longitude is required" })
});

export type FormData = z.infer<typeof schema>

export type UpsertWarehouseDto = FormData & { managerId: number | null }

interface Props {
    title: string
    size?: ModalBaseProps['size']
    isOpened: boolean
    selectedWarehouse?: Warehouse
    onClose: () => void
    onSubmit: () => void
}

export default function UpsertWarehouseModal({ title, size = "lg", isOpened, selectedWarehouse, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const [manager, setManager] = useState(selectedWarehouse?.manager ?? null)

    const [isEmployeeModalOpen, { open: openEmployeeModal, close: closeEmployeeModal }] = useModal()

    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            name: selectedWarehouse?.name || '',
            address: selectedWarehouse?.address || '',
            latitude: selectedWarehouse?.latitude || SFAX_COORDS.lat,
            longitude: selectedWarehouse?.longitude || SFAX_COORDS.lng
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const upsertWarehouseDto: UpsertWarehouseDto = {
            name: data.name,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
            managerId: manager?.id ?? null
        }


        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedWarehouse) {
                await warehousesService.updateWarehouse(selectedWarehouse.id, upsertWarehouseDto)
                alertSuccess("Warehouse updated successfully!")
            } else {
                await warehousesService.createWarehouse(upsertWarehouseDto)
                alertSuccess("New warehouse created successfully!")
                form.reset()
                setManager(null)
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
            <Modal title={title} size={size} opened={isOpened} onClose={onClose} closeOnClickOutside={false}>
                <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            <TextInput
                                data-autofocus
                                label={tGlossary("warehouse.name")}
                                placeholder={tGlossary("warehouse.name")}
                                name="name"
                                withAsterisk
                                {...form.getInputProps('name')}
                            />
                            <TextInput
                                label={tGlossary("warehouse.address")}
                                placeholder={tGlossary("warehouse.address")}
                                name="address"
                                withAsterisk
                                {...form.getInputProps('address')}
                            />
                        </SimpleGrid>
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            <NumberInput
                                label={tGlossary("warehouse.latitude")}
                                placeholder={tGlossary("warehouse.latitude")}
                                name="latitude"
                                withAsterisk
                                {...form.getInputProps('latitude')}
                            />
                            <NumberInput
                                label={tGlossary("warehouse.longitude")}
                                placeholder={tGlossary("warehouse.longitude")}
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
                        <Flex gap="5">
                            <Box style={{ flexGrow: 1 }}>
                                <SearchableCombobox
                                    selectedEntity={manager}
                                    placeholder={tGlossary("warehouse.manager")}
                                    label={tGlossary("warehouse.manager")}
                                    onFetch={employeesService.getAllEmployeesByFullName}
                                    onSelectOption={newEmployee => {
                                        setManager(newEmployee)
                                    }}
                                    onClear={() => {
                                        setManager(null)
                                    }}
                                >
                                    {
                                        (employee) => <EmployeeSelectOption employee={employee} />
                                    }
                                </SearchableCombobox>
                            </Box>
                            <PlusIconButton
                                aria-label="Add new employee"
                                onClick={openEmployeeModal}
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

            <UpsertEmployeeModal
                title={t("components.upsertEmployeeModal.title.onInsert")}
                isOpened={isEmployeeModalOpen}
                onClose={closeEmployeeModal}
                onSubmit={(savedEmployee) => {
                    setManager(savedEmployee)
                }}
            />
        </>
    )
}