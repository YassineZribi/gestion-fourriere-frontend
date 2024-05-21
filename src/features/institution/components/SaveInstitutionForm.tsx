
import { useState } from 'react';
import { TextInput, SimpleGrid, Group, Button, Center, Tooltip, InputLabel, Avatar, FileInput, rem, Flex, Box } from '@mantine/core';
import { BuildingLibraryIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { getCountryCallingCode, getNationalNumber } from '../../../lib/libphonenumber-js';
import { isNumeric, wait } from '../../../utils/helpers';
import institutionService from '../services'
import employeesService from '../../employees/services'
import { alertInfo, alertSuccess } from '../../../utils/feedback';
import PhoneInputWithCountryCombobox from '../../../components/PhoneInput';
import Institution from '../../../types/Institution';
import { getFullResourcePath } from '../../../lib/axios/api';
import { useTranslation } from 'react-i18next';
import SearchableCombobox from '../../../components/SearchableCombobox';
import EmployeeSelectOption from '../../employees/components/EmployeeSelectOption';
import UpsertEmployeeModal from '../../employees/components/UpsertEmployeeModal';
import useModal from '../../../hooks/useModal';
import PlusIconButton from '../../../components/PlusIconButton';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    email: z.string().email('Invalid email'),
    dial_code: z.string(),
    nationalPhoneNumber: z.string().min(1, 'Phone number is required'),
});

export type FormData = z.infer<typeof schema>

export type SaveInstitutionDto = Omit<FormData, 'dial_code' | 'nationalPhoneNumber'> & { phoneNumber: string, chiefExecutiveId: number | null }

interface Props {
    institution: Institution | null
    onSaveInstitution: (institution: Institution) => void;
}

export default function SaveInstitutionForm({ institution, onSaveInstitution }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [chiefExecutive, setChiefExecutive] = useState(institution?.chiefExecutive ?? null)

    const [isEmployeeModalOpen, { open: openEmployeeModal, close: closeEmployeeModal }] = useModal()

    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const initialValues = {
        name: institution?.name ?? '',
        address: institution?.address ?? '',
        email: institution?.email ?? '',
        dial_code: (institution?.phoneNumber && getCountryCallingCode(institution.phoneNumber)) ?? '+216',
        nationalPhoneNumber: (institution?.phoneNumber && getNationalNumber(institution.phoneNumber)) ?? '',
    }

    const form = useForm<FormData>({
        initialValues: initialValues,
        validate: zodResolver(schema),
    });


    const handleSubmit = async (values: FormData) => {
        console.log(values);

        const saveInstitutionDto: SaveInstitutionDto = {
            name: values.name,
            address: values.address,
            email: values.email,
            phoneNumber: values.dial_code + values.nationalPhoneNumber,
            chiefExecutiveId: chiefExecutive?.id ?? null
        }

        setIsSubmitting(true)
        try {
            await wait(2000)
            const res = await institutionService.saveInstitution(saveInstitutionDto, logoFile)
            onSaveInstitution(res.data)
            setLogoFile(null)
            alertSuccess("Institution saved successfully!")
        } catch (error) {
            console.log(error);

        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Center my={'xl'}>
                    <div style={{ position: 'relative' }}>
                        {
                            logoFile !== null && (
                                <Tooltip label={t("buttons.removeModification")} withArrow position='bottom'>
                                    <Avatar color="red" variant='filled' size={30} style={{ position: "absolute", left: 0, bottom: 0, zIndex: 1, cursor: 'pointer' }} onClick={() => setLogoFile(null)}>
                                        <TrashIcon style={{ width: rem(14), height: rem(14) }} />
                                    </Avatar>
                                </Tooltip>
                            )
                        }
                        <InputLabel htmlFor='institution-logo'>
                            <Tooltip label={t("buttons.update")} withArrow position='bottom'>
                                <Avatar color="blue" variant='filled' size={30} style={{ position: "absolute", right: 0, bottom: 0, zIndex: 1, cursor: 'pointer' }}>
                                    <PencilIcon style={{ width: rem(14), height: rem(14) }} />
                                </Avatar>
                            </Tooltip>
                        </InputLabel>
                        <Avatar
                            size={120}
                            radius={120}
                            style={{ border: "2px solid" }}
                            src={
                                logoFile
                                    ? URL.createObjectURL(logoFile)
                                    : institution?.logoPath ? getFullResourcePath(institution.logoPath) : null
                            }
                        >
                            <BuildingLibraryIcon style={{ width: rem(64), height: rem(64) }} />
                        </Avatar>
                        <FileInput
                            id='institution-logo'
                            accept="image/*"
                            onChange={file => {
                                setLogoFile(file);
                                alertInfo('Click on "Save changes" to confirm the modification')
                            }}
                            style={{ display: 'none' }}
                        />
                    </div>
                </Center>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                    <TextInput
                        label={tGlossary("institution.name")}
                        placeholder={tGlossary("institution.name")}
                        name="name"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        label={tGlossary("institution.address")}
                        placeholder={tGlossary("institution.address")}
                        name="address"
                        {...form.getInputProps('address')}
                    />
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                    <TextInput
                        label={tGlossary("institution.email")}
                        placeholder={tGlossary("institution.email")}
                        name="email"
                        {...form.getInputProps('email')}
                    />
                    <PhoneInputWithCountryCombobox
                        input={{
                            label: tGlossary("institution.phoneNumber"),
                            placeholder: tGlossary("institution.phoneNumber"),
                            name: "nationalPhoneNumber",
                            ...form.getInputProps('nationalPhoneNumber')
                        }}
                        combobox={{
                            onChange: (v) => form.setFieldValue('dial_code', v),
                            dial_code: form.values.dial_code
                        }}
                    />
                </SimpleGrid>
                <Flex gap="5" mt="xl">
                    <Box style={{ flexGrow: 1 }}>
                        <SearchableCombobox
                            selectedEntity={chiefExecutive}
                            placeholder={tGlossary("institution.manager")}
                            label={tGlossary("institution.manager")}
                            onFetch={employeesService.getAllEmployeesByFullName}
                            onSelectOption={newEmployee => {
                                setChiefExecutive(newEmployee)
                            }}
                            onClear={() => {
                                setChiefExecutive(null)
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
                <Group justify="end" mt="xl">
                    <Button type="submit" size="md" disabled={isSubmitting} loading={isSubmitting}>
                        {t("buttons.saveChanges")}
                    </Button>
                </Group>
            </form>

            <UpsertEmployeeModal
                title={t("components.upsertEmployeeModal.title.onInsert")}
                isOpened={isEmployeeModalOpen}
                onClose={closeEmployeeModal}
                onSubmit={(savedEmployee) => {
                    setChiefExecutive(savedEmployee)
                }}
            />
        </>
    );
}