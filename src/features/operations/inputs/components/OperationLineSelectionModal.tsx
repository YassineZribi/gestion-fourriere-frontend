import { useState } from "react";
import { Anchor, Box, Button, Fieldset, Flex, Group, Modal, ModalBaseProps, NumberInput, Radio, SimpleGrid, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useTranslation } from "react-i18next";
import useModal from "../../../../hooks/useModal";
import OperationLine from "../../../../types/OperationLine";
import Article from "../../../../types/Article";
import ReadOnlyCombobox from "../../../../components/ReadOnlyCombobox";
import ArticleSelectionModal from "./ArticleSelectionModal";
import ArticleFamilySelectOption from "../../../article-families/components/ArticleFamilySelectOption";
import { calculationMethods } from "../../../article-families/components/helpers";
import { capitalize } from "../../../../utils/helpers";
import ArticleSelectOption from "../../../articles/components/ArticleSelectOption";

const schema = z.object({
    articleId: z.number().refine((value) => value !== -1, {
        message: 'Article is required',
    }),
    quantity: z.number({ invalid_type_error: "Quantity is required" }).gt(0, "Quantity should be greather than 0"),
    nightlyAmount: z.number({ invalid_type_error: "Nightly amount is required" }).gt(0, "Nightly amount should be greather than 0"),
    transportFee: z.number({ invalid_type_error: "Transport fee is required" })
});

export type FormData = z.infer<typeof schema>

export type OperationLineDto = Omit<FormData, 'articleId'> & { article: Article; lineTotalAmount: number }

interface Props {
    title: string
    size?: ModalBaseProps['size']
    isOpened: boolean
    selectedOperationLine?: OperationLine
    onClose: () => void
    onSubmit: (operationLineDto: OperationLineDto) => void
}

export default function OperationLineSelectionModal({ title, size = "lg", isOpened, selectedOperationLine, onClose, onSubmit }: Props) {
    const [article, setArticle] = useState(selectedOperationLine?.article ?? null)

    const [isArticleSelectionModalOpen, { open: openArticleSelectionModal, close: closeArticleSelectionModal }] = useModal()

    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            articleId: selectedOperationLine?.article.id || -1,
            quantity: selectedOperationLine?.quantity || 1,
            nightlyAmount: selectedOperationLine?.nightlyAmount || 0,
            transportFee: selectedOperationLine?.transportFee || 0,
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        if (!article) return;

        const operationLineDto: OperationLineDto = {
            article: article,
            quantity: data.quantity,
            nightlyAmount: data.nightlyAmount,
            transportFee: data.transportFee,
            lineTotalAmount: data.nightlyAmount * data.quantity + data.transportFee
        }

        form.reset()
        setArticle(null)

        onSubmit(operationLineDto)
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
                <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <ReadOnlyCombobox
                            selectedEntity={article}
                            placeholder={tGlossary("operationLine.article")}
                            label={tGlossary("operationLine.article")}
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

                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            <NumberInput
                                label={tGlossary("operationLine.quantity")}
                                placeholder={tGlossary("operationLine.quantity")}
                                name="quantity"
                                withAsterisk
                                {...form.getInputProps('quantity')}
                            />
                            <NumberInput
                                label={tGlossary("operationLine.nightlyAmount")}
                                placeholder={tGlossary("operationLine.nightlyAmount")}
                                name="nightlyAmount"
                                withAsterisk
                                {...form.getInputProps('nightlyAmount')}
                            />
                        </SimpleGrid>
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            <NumberInput
                                label={tGlossary("operationLine.transportFee")}
                                placeholder={tGlossary("operationLine.transportFee")}
                                name="transportFee"
                                withAsterisk
                                {...form.getInputProps('transportFee')}
                            />
                            <NumberInput
                                label={tGlossary("operationLine.lineTotalAmount")}
                                placeholder={tGlossary("operationLine.lineTotalAmount")}
                                name="lineTotalAmount"
                                value={form.values.nightlyAmount * form.values.quantity + form.values.transportFee}
                                readOnly
                            />
                        </SimpleGrid>
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