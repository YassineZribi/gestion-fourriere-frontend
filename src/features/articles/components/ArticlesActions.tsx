import { useState } from "react";
import { Text } from "@mantine/core";
import ConfirmationModal from "../../../components/ConfirmationModal";
import InfoDetailsModal from "../../../components/InfoDetailsModal";
import ArticleDetails from "./ArticleDetails";
import TRowActions from "../../../components/DataTable/TRowActions";
import useModal from "../../../hooks/useModal";
import articlesService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import UpsertArticleModal from "./UpsertArticleModal";
import { useTranslation } from "react-i18next";
import Article from "../../../types/Article";

interface Props {
    selectedArticle: Article
    hideUpdateBtn?: boolean
    hideDeleteBtn?: boolean
    onUpdateArticle: () => void
    onDeleteArticle: () => void
}

export default function ArticlesActions({ selectedArticle, hideUpdateBtn, hideDeleteBtn, onDeleteArticle, onUpdateArticle }: Props) {
    const { t } = useTranslation()

    const [isUpdateArticleModalOpen, { open: openUpdateArticleModal, close: closeUpdateArticleModal }] = useModal()

    const [isArticleDetailsModalOpen, { open: openArticleDetailsModal, close: closeArticleDetailsModal }] = useModal()

    const [isConfirmationModalOpen, { open: openConfirmationModal, close: closeConfirmationModal }] = useModal()
    const [isDeletingArticleLoading, setDeletingArticleLoading] = useState(false)

    const confirmDeletingEmployee = async () => {
        setDeletingArticleLoading(true)
        try {
            await wait(2000)
            await articlesService.deleteArticle(selectedArticle.id)
            alertSuccess("Article deleted successfully!")
            onDeleteArticle()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingArticleLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                hideUpdateBtn={hideUpdateBtn}
                hideDeleteBtn={hideDeleteBtn}
                onShowDetailsBtnClick={openArticleDetailsModal}
                onUpdateBtnClick={openUpdateArticleModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isArticleDetailsModalOpen}
                onClose={closeArticleDetailsModal}
            >
                <ArticleDetails
                    article={selectedArticle}
                />
            </InfoDetailsModal>

            {
                !hideUpdateBtn && (
                    <UpsertArticleModal
                        title={t("components.upsertArticleModal.title.onUpdate")}
                        isOpened={isUpdateArticleModalOpen}
                        selectedArticle={selectedArticle}
                        onClose={closeUpdateArticleModal}
                        onSubmit={onUpdateArticle}
                    />
                )
            }

            {
                !hideDeleteBtn && (
                    <ConfirmationModal
                        isLoading={isDeletingArticleLoading}
                        isOpened={isConfirmationModalOpen}
                        onCancel={closeConfirmationModal}
                        onConfirm={confirmDeletingEmployee}
                    >
                        <Text size="md" fw={"bold"}>
                            {t("components.articlesActions.confirmationModal.message")}
                        </Text>
                    </ConfirmationModal>
                )
            }

        </>
    )
}