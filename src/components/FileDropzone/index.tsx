import { Avatar, Box, Flex, Group, Image, Input, Text, Tooltip, rem } from '@mantine/core';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { ArrowUpTrayIcon as IconUpload, XMarkIcon as IconX, PhotoIcon as IconPhoto, TrashIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { getFullResourcePath } from '../../lib/axios/api';
import { useTranslation } from 'react-i18next';

interface Props {
    label?: string
    required?: boolean
    file: FileWithPath | null
    savedFilePath?: string | null
    onChange: (file: FileWithPath | null) => void
    onClear: () => void
}

export default function FileDropzone({ label, required = false, file, savedFilePath, onChange, onClear, ...rest }: /* Partial<DropzoneProps> & */ Props) {
    const { t } = useTranslation()
    const preview = useMemo(() => {
        const imageUrl = file
            ? URL.createObjectURL(file)
            : savedFilePath ? getFullResourcePath(savedFilePath) : null
        if (imageUrl == null) return null
        return <Image src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} maw={150} w={'100%'} mx={"auto"} display={"inline-block"} radius={4} />;
    }, [file]);
    return (
        <Box>
            {label && <Input.Label required={required}>{label}</Input.Label>}
            <Dropzone
                onDrop={(files) => { console.log('accepted files', files); onChange(files[0]) }}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                {...rest}
            >
                <Group justify="center" gap="md" style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            style={{ width: rem(42), height: rem(42), color: 'var(--mantine-color-blue-6)' }}
                        // stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{ width: rem(42), height: rem(42), color: 'var(--mantine-color-red-6)' }}
                        // stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto
                            style={{ width: rem(42), height: rem(42), color: 'var(--mantine-color-dimmed)' }}
                        // stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="md" inline>
                            {t("components.fileDropzone.message")}
                        </Text>
                        <Text size="xs" c="dimmed" inline mt={7}>
                            {t("components.fileDropzone.note", {limit: '5'})}
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <Flex>
                <Box mt={"sm"} pos={"relative"} style={{display:"inline-block"}}>
                    {preview}
                    {
                        file !== null && (
                            <Tooltip label={t("buttons.removeModification")} withArrow position='left'>
                                <Avatar color="red" variant='filled' size={30} pos={"absolute"} right={4} top={4} style={{ zIndex: 1, cursor: 'pointer' }} onClick={onClear}>
                                    <TrashIcon style={{ width: rem(14), height: rem(14) }} />
                                </Avatar>
                            </Tooltip>
                        )
                    }
                </Box>
            </Flex>
        </Box>
    );
}