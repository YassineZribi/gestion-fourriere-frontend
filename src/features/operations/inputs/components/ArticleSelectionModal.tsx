import { useState } from "react";
import { Anchor, Box, Button, Group, Modal, ModalBaseProps, Space } from "@mantine/core";
import { useTranslation } from "react-i18next";
import Article from "../../../../types/Article";
import ArticlesSelectionManagement from "./ArticlesSelectionManagement";

interface Props {
    title: string
    size?: ModalBaseProps['size']
    isOpened: boolean
    onClose: () => void
    onSubmit: (selectedArticle: Article | null) => void
}

export default function ArticleSelectionModal({ title, size = "100%", isOpened, onClose, onSubmit }: Props) {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
    const { t } = useTranslation()

    const handleSelectArticle = (article: Article | null) => {
        setSelectedArticle(article)
    }

    const handleClose = () => {
        setSelectedArticle(null)
        onClose()
    }

    const handleConfirm = () => {
        onSubmit(selectedArticle)
        handleClose()
    }

    return (
        <Modal title={title} size={size} opened={isOpened} onClose={handleClose} closeOnClickOutside={false}>

            <Space my={'xl'} />

            <Box mih={460}>
                <ArticlesSelectionManagement onSelect={handleSelectArticle} selectedArticle={selectedArticle} />
            </Box>

            <Group justify="space-between" mt="xl">
                <Anchor component="button" type="button" variant="gradient" onClick={handleClose} size="sm">
                    {t("buttons.cancel")}
                </Anchor>
                <Button type="submit" disabled={!selectedArticle} onClick={handleConfirm}>
                    {t("buttons.save")}
                </Button>
            </Group>
        </Modal>
    )
}