
import { useState } from 'react';
import { TextInput, SimpleGrid, Group, Button, Center, Tooltip, InputLabel, Indicator, Avatar, FileInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { parsePhoneNumber } from '../../../lib/libphonenumber-js';
import useAuthStore from '../../../store/useAuthStore';
import { wait } from '../../../utils/helpers';
import accountService from '../services'
import { alertInfo, alertSuccess } from '../../../utils/feedback';
import { PencilIcon } from '@heroicons/react/24/outline';
import PhoneInputWithCountryCombobox from '../../../components/PhoneInput';
import { getFullResourcePath } from '../../../lib/axios/api';

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

    const handleReset = () => {
        form.reset();
        setPhotoFile(null)
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Center my={'xl'}>
                <Tooltip label="Update profile picture" withArrow position='bottom'>
                    <InputLabel htmlFor='profile-photo'>
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
                                    photoFile
                                        ? URL.createObjectURL(photoFile)
                                        : user.photoPath ? getFullResourcePath(user.photoPath) : ""
                                }
                            />
                        </Indicator>
                    </InputLabel>
                </Tooltip>
                <FileInput
                    id='profile-photo'
                    accept="image/*"
                    onChange={file => {
                        setPhotoFile(file);
                        alertInfo('Click on "Save changes" to confirm the modification')
                    }}
                    style={{ display: 'none' }}
                />
            </Center>
            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                <TextInput
                    label="First Name"
                    placeholder="Your first name"
                    name="firstName"
                    {...form.getInputProps('firstName')}
                />
                <TextInput
                    label="Last Name"
                    placeholder="Your last name"
                    name="lastName"
                    {...form.getInputProps('lastName')}
                />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                <TextInput
                    label="Email"
                    placeholder="Your email"
                    name="email"
                    disabled
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