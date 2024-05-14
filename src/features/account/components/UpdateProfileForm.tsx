
import { useState } from 'react';
import { TextInput, SimpleGrid, Group, Button, Center, Tooltip, InputLabel, Avatar, FileInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { parsePhoneNumber } from '../../../lib/libphonenumber-js';
import useAuthStore from '../../../store/useAuthStore';
import { wait } from '../../../utils/helpers';
import accountService from '../services'
import { alertInfo, alertSuccess } from '../../../utils/feedback';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import PhoneInputWithCountryCombobox from '../../../components/PhoneInput';
import { getFullResourcePath } from '../../../lib/axios/api';
import { useTranslation } from 'react-i18next';

const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    dial_code: z.string(),
    nationalPhoneNumber: z.string().min(1, 'Phone number is required'),
});

export type FormData = z.infer<typeof schema>

export type UpdateProfileDto = Omit<FormData, 'dial_code' | 'nationalPhoneNumber'> & { phoneNumber: string }

export default function UpdateProfileForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [photoFile, setPhotoFile] = useState<File | null>(null)
    const { user, updateAuthenticatedUser } = useAuthStore();
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    if (!user) return null;

    // Parse the phone number
    const phoneNumber = parsePhoneNumber(user.phoneNumber); // like "+21622585016"

    const form = useForm<FormData>({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dial_code: phoneNumber?.countryCallingCode || '+216',
            nationalPhoneNumber: phoneNumber?.nationalNumber || '',
        },
        validate: zodResolver(schema),
    });


    const handleSubmit = async (values: FormData) => {
        console.log(values);

        const updateProfileDto: UpdateProfileDto = {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.dial_code + values.nationalPhoneNumber
        }

        setIsSubmitting(true)
        try {
            await wait(2000)
            const res = await accountService.updateProfile(updateProfileDto, photoFile)
            updateAuthenticatedUser(res.data)
            setPhotoFile(null)
            alertSuccess("Profile updated successfully!")
        } catch (error) {
            console.log(error);

        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Center my={'xl'}>
                <div style={{ position: 'relative' }}>
                    {
                        photoFile !== null && (
                            <Tooltip label={t("buttons.removeModification")} withArrow position='bottom'>
                                <Avatar color="red" variant='filled' size={30} style={{ position: "absolute", left: 0, bottom: 0, zIndex: 1, cursor: 'pointer' }} onClick={() => setPhotoFile(null)}>
                                    <TrashIcon style={{ width: rem(14), height: rem(14) }} />
                                </Avatar>
                            </Tooltip>
                        )
                    }
                    <InputLabel htmlFor='profile-photo'>
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
                            photoFile
                                ? URL.createObjectURL(photoFile)
                                : user.photoPath ? getFullResourcePath(user.photoPath) : null
                        }
                    />
                    <FileInput
                        id='profile-photo'
                        accept="image/*"
                        onChange={file => {
                            setPhotoFile(file);
                            alertInfo('Click on "Save changes" to confirm the modification')
                        }}
                        style={{ display: 'none' }}
                    />
                </div>
            </Center>
            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                <TextInput
                    label={tGlossary("user.firstName")}
                    placeholder={tGlossary("user.firstName")}
                    name="firstName"
                    {...form.getInputProps('firstName')}
                />
                <TextInput
                    label={tGlossary("user.lastName")}
                    placeholder={tGlossary("user.lastName")}
                    name="lastName"
                    {...form.getInputProps('lastName')}
                />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                <TextInput
                    label={tGlossary("user.email")}
                    placeholder={tGlossary("user.email")}
                    name="email"
                    disabled
                    {...form.getInputProps('email')}
                />
                <PhoneInputWithCountryCombobox
                    input={{
                        label: tGlossary("user.phoneNumber"),
                        placeholder: tGlossary("user.phoneNumber"),
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
                <Button type="submit" size="md" disabled={isSubmitting} loading={isSubmitting}>
                    {t('buttons.saveChanges')}
                </Button>
            </Group>
        </form>
    );
}