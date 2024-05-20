import { useState } from "react";
import { Anchor, Button, Group, Modal, NumberInput, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { capitalize, wait } from "../../../utils/helpers";
import articlesService from "../services"
import articleFamiliesService from '../../article-families/services'
import { alertSuccess } from "../../../utils/feedback";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../components/SearchableCombobox";
import ArticleFamilySelectOption from "../../article-families/components/ArticleFamilySelectOption";
import Article from "../../../types/Article";
import FileDropzone from "../../../components/FileDropzone";
import { FileWithPath } from "@mantine/dropzone";

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    transportFee: z.number({ invalid_type_error: "Transport fee is required" }).gt(0, "Transport fee should be greather than 0"),
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


        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedArticle) {
                await articlesService.updateArticle(selectedArticle.id, upsertArticleDto, photoFile)
                alertSuccess("Article updated successfully!")
            } else {
                await articlesService.createArticle(upsertArticleDto, photoFile)
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

    return (
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
                    <SearchableCombobox
                        selectedEntity={articleFamily}
                        placeholder={tGlossary("article.articleFamily")}
                        label={tGlossary("article.articleFamily")}
                        error={form.errors.articleFamilyId?.toString()}
                        withAsterisk
                        onFetch={articleFamiliesService.getAllArticleFamiliesByName}
                        onSelectOption={newRegister => {
                            setArticleFamily(newRegister)
                            if (newRegister) {
                                form.setFieldValue("articleFamilyId", newRegister.id)
                            }
                            form.clearFieldError("articleFamilyId")
                        }}
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
                        Save
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}