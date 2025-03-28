import { useState } from "react";
import { Anchor, Box, Button, Flex, Group, Modal, NumberInput, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { wait } from "../../../utils/helpers";
import articlesService from "../services"
import articleFamiliesService from '../../article-families/services'
import { alertSuccess } from "../../../utils/feedback";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../components/SearchableCombobox";
import ArticleFamilySelectOption from "../../article-families/components/ArticleFamilySelectOption";
import Article from "../../../types/Article";
import ArticleFamily from "../../../types/ArticleFamily";
import FileDropzone from "../../../components/FileDropzone";
import { FileWithPath } from "@mantine/dropzone";
import UpsertArticleFamilyModal from "../../article-families/components/UpsertArticleFamilyModal";
import useModal from "../../../hooks/useModal";
import PlusIconButton from "../../../components/PlusIconButton";

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    transportFee: z.number({ invalid_type_error: "Transport fee is required" }).gte(0, "Transport fee should be greather than or equal to 0"),
    articleFamilyId: z.number().refine((value) => value !== -1, {
        message: 'Article family is required',
    })
});

export type FormData = z.infer<typeof schema>

export type UpsertArticleDto = FormData

interface Props {
    title: string
    isOpened: boolean
    selectedArticle?: Article
    onClose: () => void
    onSubmit: () => void
}

export default function UpsertArticleModal({ title, isOpened, selectedArticle, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const [articleFamily, setArticleFamily] = useState(selectedArticle?.articleFamily ?? null)
    const [photoFile, setPhotoFile] = useState<FileWithPath | null>(null);

    const [isArticleFamilyModalOpen, { open: openArticleFamilyModal, close: closeArticleFamilyModal }] = useModal()

    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            name: selectedArticle?.name || '',
            transportFee: selectedArticle?.transportFee || 0,
            articleFamilyId: selectedArticle?.articleFamily?.id || -1,
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const upsertArticleDto: UpsertArticleDto = {
            name: data.name,
            transportFee: data.transportFee,
            articleFamilyId: data.articleFamilyId,
        }
        console.log(upsertArticleDto);

        const formData = new FormData()
        formData.append("name", upsertArticleDto.name)
        formData.append("transportFee", String(upsertArticleDto.transportFee))
        formData.append("articleFamilyId", String(upsertArticleDto.articleFamilyId))
        if (photoFile !== null) {
            formData.append("photoFile", photoFile)
        }

        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedArticle) {
                await articlesService.updateArticle(selectedArticle.id, formData)
                alertSuccess("Article updated successfully!")
            } else {
                await articlesService.createArticle(formData)
                alertSuccess("New article created successfully!")
                form.reset()
                setArticleFamily(null)
            }
            setPhotoFile(null)

            onSubmit()
            onClose()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    const updateArticleFamily = (newArticleFamily: ArticleFamily | null) => {        
        setArticleFamily(newArticleFamily)
        if (newArticleFamily) {
            form.setFieldValue("articleFamilyId", newArticleFamily.id)
        }
        form.clearFieldError("articleFamilyId")
    }

    return (
        <>
            <Modal size={"lg"} title={title} opened={isOpened} onClose={onClose} closeOnClickOutside={false}>
                <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            <TextInput
                                data-autofocus
                                label={tGlossary("article.name")}
                                placeholder={tGlossary("article.name")}
                                name="name"
                                withAsterisk
                                {...form.getInputProps('name')}
                            />
                            <NumberInput
                                label={tGlossary("article.transportFee")}
                                placeholder={tGlossary("article.transportFee")}
                                name="transportFee"
                                withAsterisk
                                {...form.getInputProps('transportFee')}
                            />
                        </SimpleGrid>
                        <Flex gap="5">
                            <Box style={{ flexGrow: 1 }}>
                                <SearchableCombobox
                                    selectedEntity={articleFamily}
                                    placeholder={tGlossary("article.articleFamily")}
                                    label={tGlossary("article.articleFamily")}
                                    error={form.errors.articleFamilyId?.toString()}
                                    withAsterisk
                                    onFetch={articleFamiliesService.getAllArticleFamiliesByName}
                                    onSelectOption={updateArticleFamily}
                                    onClear={() => {
                                        setArticleFamily(null)
                                        form.setFieldValue("articleFamilyId", -1)
                                        form.clearFieldError("articleFamilyId")
                                    }}
                                >
                                    {
                                        (articleFamily) => <ArticleFamilySelectOption articleFamily={articleFamily} />
                                    }
                                </SearchableCombobox>
                            </Box>
                            <PlusIconButton
                                aria-label="Add new article family"
                                onClick={openArticleFamilyModal}
                            />
                        </Flex>
                        <FileDropzone
                            label={tGlossary("article.photo")}
                            file={photoFile}
                            savedFilePath={selectedArticle?.photoPath}
                            onChange={(photoFile) => setPhotoFile(photoFile)}
                            onClear={() => setPhotoFile(null)}
                        />
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

            <UpsertArticleFamilyModal
                title={t("components.upsertArticleFamilyModal.title.onInsert")}
                isOpened={isArticleFamilyModalOpen}
                onClose={closeArticleFamilyModal}
                onSubmit={updateArticleFamily}
            />
        </>
    )
}