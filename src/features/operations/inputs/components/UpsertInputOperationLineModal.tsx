import { useEffect, useState } from "react";
import { Anchor, Box, Button, Fieldset, Group, Modal, ModalBaseProps, NumberInput, Radio, SimpleGrid, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useTranslation } from "react-i18next";
import useModal from "../../../../hooks/useModal";
import Article from "../../../../types/Article";
import ReadOnlyCombobox from "../../../../components/ReadOnlyCombobox";
import ArticleSelectionModal from "./ArticleSelectionModal";
import ArticleFamilySelectOption from "../../../article-families/components/ArticleFamilySelectOption";
import { calculationMethods } from "../../../article-families/components/helpers";
import { capitalize } from "../../../../utils/helpers";
import ArticleSelectOption from "../../../articles/components/ArticleSelectOption";
import { FileWithPath } from "@mantine/dropzone";
import FileDropzone from "../../../../components/FileDropzone";

const schema = z.object({
    articleId: z.number().refine((value) => value !== -1, {
        message: 'Article is required',
    }),
    quantity: z.number({ invalid_type_error: "Quantity is required" }).gt(0, "Quantity should be greather than 0"),
    nightlyAmount: z.number({ invalid_type_error: "Nightly amount is required" }).gt(0, "Nightly amount should be greather than 0"),
    transportFee: z.number({ invalid_type_error: "Transport fee is required" }),
    description: z.string().min(1, 'Description is required'),
    observation: z.string().nullable(),
    note: z.string().nullable()
});

export type FormData = z.infer<typeof schema>

export type InputOperationLineDto = Omit<FormData, 'articleId'> & { article: Article; subTotalNightlyAmount: number; photoFile: FileWithPath | null, photoPath: string | null }

interface Props {
    title: string
    size?: ModalBaseProps['size']
    isOpened: boolean
    selectedInputOperationLine?: InputOperationLineDto
    onClose: () => void
    onSubmit: (inputOperationLineDto: InputOperationLineDto) => void
}

export default function UpsertInputOperationLineModal({ title, size = "lg", isOpened, selectedInputOperationLine, onClose, onSubmit }: Props) {
    const [article, setArticle] = useState(selectedInputOperationLine?.article || null)
    const [photoFile, setPhotoFile] = useState<FileWithPath | null>(selectedInputOperationLine?.photoFile || null);
    const [photoPath, setPhotoPath] = useState<string | null>(selectedInputOperationLine?.photoPath || null);

    useEffect(() => {
        if (selectedInputOperationLine) {
            setPhotoFile(selectedInputOperationLine.photoFile)
            setPhotoPath(selectedInputOperationLine.photoPath)
        }
    }, [selectedInputOperationLine])

    const [isArticleSelectionModalOpen, { open: openArticleSelectionModal, close: closeArticleSelectionModal }] = useModal()

    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            articleId: selectedInputOperationLine?.article.id || -1,
            quantity: selectedInputOperationLine?.quantity || 1,
            nightlyAmount: selectedInputOperationLine?.nightlyAmount || 0,
            transportFee: selectedInputOperationLine?.transportFee || 0,
            description: selectedInputOperationLine?.description || '',
            observation: selectedInputOperationLine?.observation || '',
            note: selectedInputOperationLine?.note || ''
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        if (!article) return;

        const inputOperationLineDto: InputOperationLineDto = {
            article: article,
            quantity: data.quantity,
            nightlyAmount: data.nightlyAmount,
            subTotalNightlyAmount: data.nightlyAmount * data.quantity,
            transportFee: data.transportFee,
            description: data.description,
            observation: data.observation,
            note: data.note,
            photoFile,
            photoPath
        }

        if (!selectedInputOperationLine) { // not update mode
            form.reset()
            setArticle(null)
            setPhotoFile(null)
            setPhotoPath(null)
        }

        onSubmit(inputOperationLineDto)
        onClose()
    }

    const updateArticle = (newArticle: Article | null) => {
        console.log(newArticle);
        setArticle(newArticle)
        if (newArticle) {
            form.setFieldValue("articleId", newArticle.id)

            form.setValues({
                nightlyAmount: newArticle.articleFamily?.nightlyAmount || 0,
                transportFee: newArticle.transportFee
            })
        }
        form.clearFieldError("articleId")
    }

    return (
        <>
            <Modal title={title} size={size} opened={isOpened} onClose={onClose} closeOnClickOutside={false}>
                <form autoComplete="off" onSubmit={(event) => {
                    // this part is for stopping parent forms to trigger their submit
                    event?.preventDefault?.();
                    event?.stopPropagation?.();

                    return form.onSubmit(handleSubmit)(event);
                }}>
                    <Stack>
                        <ReadOnlyCombobox
                            selectedEntity={article}
                            placeholder={tGlossary("inputOperationLine.article")}
                            label={tGlossary("inputOperationLine.article")}
                            error={form.errors.articleId?.toString()}
                            withAsterisk
                            height={50}
                            onClear={() => {
                                setArticle(null)
                                form.setFieldValue("articleId", -1)
                                form.clearFieldError("articleId")

                                form.reset()
                            }}
                            onClick={openArticleSelectionModal}
                        >
                            {
                                (article) => <ArticleSelectOption article={article} /> /* <OwnerSelectOption owner={owner} /> */
                            }
                        </ReadOnlyCombobox>

                        <Fieldset variant="filled" legend="Article information">
                            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                                <Box style={{ flexGrow: 1 }}>
                                    <ReadOnlyCombobox
                                        selectedEntity={article?.articleFamily || null}
                                        placeholder={tGlossary("article.articleFamily")}
                                        label={tGlossary("article.articleFamily")}
                                        error={form.errors.ownerId?.toString()}

                                        disabled
                                    >
                                        {
                                            (articleFamily) => <ArticleFamilySelectOption articleFamily={articleFamily} />
                                        }
                                    </ReadOnlyCombobox>
                                </Box>
                                <Radio.Group
                                    label={tGlossary("articleFamily.calculationMethod")}
                                    name="unitCalculation"
                                    value={article?.articleFamily ? String(article.articleFamily.unitCalculation) : null}
                                >
                                    <Group mt={8} gap={"xl"}>
                                        {
                                            calculationMethods.map((method) => {
                                                return (
                                                    <Radio
                                                        key={method.label}
                                                        disabled
                                                        value={String(method.value)}
                                                        label={capitalize(tGlossary(`calculationMethods.${method.label}`))}
                                                    />
                                                )
                                            })
                                        }
                                    </Group>
                                </Radio.Group>
                            </SimpleGrid>
                            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                                <NumberInput
                                    label={tGlossary("articleFamily.nightlyAmount")}
                                    placeholder={tGlossary("articleFamily.nightlyAmount")}
                                    name="nightlyAmount"
                                    value={article?.articleFamily?.nightlyAmount || ""}
                                    disabled
                                />
                                <NumberInput
                                    label={tGlossary("article.transportFee")}
                                    placeholder={tGlossary("article.transportFee")}
                                    name="transportFee"
                                    value={article?.transportFee || ""}
                                    disabled
                                />
                            </SimpleGrid>
                        </Fieldset>

                        <SimpleGrid cols={{ base: 1, sm: 3 }}>
                            <NumberInput
                                label={tGlossary("inputOperationLine.quantity")}
                                placeholder={tGlossary("inputOperationLine.quantity")}
                                name="quantity"
                                withAsterisk
                                {...form.getInputProps('quantity')}
                            />
                            <NumberInput
                                label={tGlossary("inputOperationLine.nightlyAmount")}
                                placeholder={tGlossary("inputOperationLine.nightlyAmount")}
                                name="nightlyAmount"
                                withAsterisk
                                {...form.getInputProps('nightlyAmount')}
                            />
                            <NumberInput
                                label={tGlossary("inputOperationLine.subTotalNightlyAmount")}
                                placeholder={tGlossary("inputOperationLine.subTotalNightlyAmount")}
                                disabled
                                name="subTotalNightlyAmount"
                                value={form.values.nightlyAmount * form.values.quantity}
                                readOnly
                            />
                        </SimpleGrid>
                        <SimpleGrid cols={{ base: 1, sm: 1 }}>
                            <NumberInput
                                label={tGlossary("inputOperationLine.transportFee")}
                                placeholder={tGlossary("inputOperationLine.transportFee")}
                                name="transportFee"
                                withAsterisk
                                {...form.getInputProps('transportFee')}
                            />
                        </SimpleGrid>
                        <FileDropzone
                            label={tGlossary("inputOperationLine.photo")}
                            file={photoFile}
                            savedFilePath={photoPath}
                            clearable
                            onChange={(photoFile) => {
                                setPhotoFile(photoFile)
                                setPhotoPath(photoFile ? URL.createObjectURL(photoFile) : null)
                            }}
                            onClear={() => {
                                setPhotoFile(null)
                                setPhotoPath(null)
                            }}
                        />
                        <Textarea
                            label={tGlossary("inputOperationLine.description")}
                            placeholder={tGlossary("inputOperationLine.description")}
                            name="description"
                            withAsterisk
                            {...form.getInputProps('description')}
                        />
                        <Textarea
                            label={tGlossary("inputOperationLine.observation")}
                            placeholder={tGlossary("inputOperationLine.observation")}
                            name="observation"
                            // withAsterisk
                            {...form.getInputProps('observation')}
                        />
                        <Textarea
                            label={tGlossary("inputOperationLine.note")}
                            placeholder={tGlossary("inputOperationLine.note")}
                            name="note"
                            // withAsterisk
                            {...form.getInputProps('note')}
                        />
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" variant="gradient" onClick={onClose} size="sm">
                            {t("buttons.cancel")}
                        </Anchor>
                        <Button type="submit">
                            {t("buttons.save")}
                        </Button>
                    </Group>
                </form>
            </Modal>

            <ArticleSelectionModal
                title={"Select article"}
                isOpened={isArticleSelectionModalOpen}
                onClose={closeArticleSelectionModal}
                onSubmit={updateArticle}
            />
        </>
    )
}