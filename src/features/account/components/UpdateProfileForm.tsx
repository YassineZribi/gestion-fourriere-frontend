
import { useState } from 'react';
import { TextInput, SimpleGrid, Group, Button, useDirection, Center, Tooltip, InputLabel, Indicator, Avatar, FileInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import CountriesPhoneNumbersCombobox from '../../../components/CountriesPhoneNumbersCombobox';
import { parsePhoneNumber } from '../../../lib/libphonenumber-js';
import useAuthStore from '../../../store/useAuthStore';
import { wait } from '../../../utils/helpers';
import accountService from '../services/account'
import UpdateProfileDto from '../types/UpdateProfileDto';
import { alertInfo, alertSuccess } from '../../../utils/feedback';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function UpdateProfileForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [photoFile, setPhotoFile] = useState<File | null>(null)
    const {user, updateAuthenticatedUser} = useAuthStore();
    const { dir } = useDirection();

    if (!user) return null;

    // Parse the phone number
    const phoneNumber = parsePhoneNumber(user.phoneNumber); // "+21622585016"

    const form = useForm({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dial_code: phoneNumber?.countryCallingCode || '+216',
            nationalPhoneNumber: phoneNumber?.nationalNumber || '',
        },
        validate: {
            firstName: (value) => value.trim().length === 0 ? "First name is required" : null,
            lastName: (value) => value.trim().length === 0 ? "Last name is required" : null,
            email: (value) => !/^\S+@\S+$/.test(value) ? "Invalid email" : null,
            nationalPhoneNumber: (value) => value.trim().length === 0 ? "Phone number is required" : null, // ? null : "Phone number should be valid"
        },
    });

    return (
        <form onSubmit={form.onSubmit(async (values) => {
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
        })}>
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
                                style={{border: "2px solid"}}
                                src={
                                    photoFile 
                                        ? URL.createObjectURL(photoFile) 
                                        : user.photoPath ? accountService.getFullPhotoPath(user.photoPath) : ""
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
                    style={{display: 'none'}} 
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
                <div style={{ position: 'relative' }}>
                    <TextInput
                        type='text'
                        styles={{ input: { paddingInlineStart: 100 } }}
                        name="nationalPhoneNumber"
                        label="Phone Number"
                        placeholder="enter your phone number"
                        {...form.getInputProps('nationalPhoneNumber')}
                    />
                    <div style={{ position: 'absolute', top: 24.8, transform: `scale(0.9) translateX(${dir === "ltr" ? "-" : ""}4px)` }}>
                        <CountriesPhoneNumbersCombobox
                            style={{
                                width: 100
                            }}
                            onChange={(v) => form.setFieldValue('dial_code', v)}
                            dial_code={form.values.dial_code}
                        />
                    </div>
                </div>
            </SimpleGrid>
            <Group justify="end" mt="xl">
                <Button type="reset" onClick={() => {form.reset(); setPhotoFile(null)}} size="md" variant='outline'>
                    Reset
                </Button>
                <Button type="submit" size="md" disabled={isSubmitting} loading={isSubmitting}>
                    Save changes
                </Button>
            </Group>
        </form>
    );
}