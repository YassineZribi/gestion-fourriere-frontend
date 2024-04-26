
import { useState } from 'react';
import { TextInput, SimpleGrid, Group, Button, Center, Tooltip, InputLabel, Indicator, Avatar, FileInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { getCountryCallingCode, getNationalNumber } from '../../../lib/libphonenumber-js';
import { wait } from '../../../utils/helpers';
import institutionService from '../services'
import { alertInfo, alertSuccess } from '../../../utils/feedback';
import { BuildingLibraryIcon, PencilIcon } from '@heroicons/react/24/outline';
import PhoneInputWithCountryCombobox from '../../../components/PhoneInput';
import Institution from '../../../types/Institution';
import { getFullResourcePath } from '../../../lib/axios/api';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    email: z.string().email('Invalid email'),
    dial_code: z.string(),
    nationalPhoneNumber: z.string().min(1, 'Phone number is required'),
});

export type FormData = z.infer<typeof schema>

export type SaveInstitutionDto = Omit<FormData, 'dial_code' | 'nationalPhoneNumber'> & { phoneNumber: string }

interface Props {
    institution: Institution | null
    onSaveInstitution: (institution: Institution) => void;
}

export default function SaveInstitutionForm({ institution, onSaveInstitution }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null)

    const form = useForm<FormData>({
        initialValues: {
            name: institution?.name ?? '',
            address: institution?.address ?? '',
            email: institution?.email ?? '',
            dial_code: (institution?.phoneNumber && getCountryCallingCode(institution.phoneNumber)) ?? '+216',
            nationalPhoneNumber: (institution?.phoneNumber && getNationalNumber(institution.phoneNumber)) ?? '',
        },
        validate: zodResolver(schema),
    });


    const handleSubmit = async (values: FormData) => {
        console.log(values);

        const saveInstitutionDto: SaveInstitutionDto = {
            name: values.name,
            address: values.address,
            email: values.email,
            phoneNumber: values.dial_code + values.nationalPhoneNumber
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

    const handleReset = () => {
        form.reset();
        setLogoFile(null)
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Center my={'xl'}>
                <Tooltip label="Update institution logo" withArrow position='bottom'>
                    <InputLabel htmlFor='institution-logo'>
                        <Indicator
                            onClick={() => console.log("clicked")}
                            inline
                            label={<PencilIcon style={{ width: rem(14), height: rem(14) }} />}
                            size={30}
                            offset={15}
                            position="bottom-end"
                            color="blue"
                            withBorder
                            style={{ cursor: "pointer" }}
                        >
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
                        </Indicator>
                    </InputLabel>
                </Tooltip>
                <FileInput
                    id='institution-logo'
                    accept="image/*"
                    onChange={file => {
                        setLogoFile(file);
                        alertInfo('Click on "Save changes" to confirm the modification')
                    }}
                    style={{ display: 'none' }}
                />
            </Center>
            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                <TextInput
                    label="Name"
                    placeholder="Institution name"
                    name="name"
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Address"
                    placeholder="Institution address"
                    name="address"
                    {...form.getInputProps('address')}
                />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                <TextInput
                    label="Email"
                    placeholder="Institution email"
                    name="email"
                    {...form.getInputProps('email')}
                />
                <PhoneInputWithCountryCombobox
                    input={{
                        name: "nationalPhoneNumber",
                        ...form.getInputProps('nationalPhoneNumber')
                    }}
                    combobox={{
                        onChange: (v) => form.setFieldValue('dial_code', v),
                        dial_code: form.values.dial_code
                    }}
                />
            </SimpleGrid>
            <Group justify="end" mt="xl">
                <Button type="reset" onClick={handleReset} size="md" variant='outline'>
                    Reset
                </Button>
                <Button type="submit" size="md" disabled={isSubmitting} loading={isSubmitting}>
                    Save changes
                </Button>
            </Group>
        </form>
    );
}