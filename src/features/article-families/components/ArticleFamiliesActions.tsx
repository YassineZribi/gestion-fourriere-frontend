import { useState } from "react";
import { Text } from "@mantine/core";
import ConfirmationModal from "../../../components/ConfirmationModal";
import InfoDetailsModal from "../../../components/InfoDetailsModal";
import ArticleFamilyDetails from "./ArticleFamilyDetails";
import TRowActions from "../../../components/DataTable/TRowActions";
import useModal from "../../../hooks/useModal";
import articleFamiliesService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import UpsertArticleFamilyModal from "./UpsertArticleFamilyModal";
import { useTranslation } from "react-i18next";
import ArticleFamily from "../../../types/ArticleFamily";

interface Props {
    selectedArticleFamily: ArticleFamily
    onUpdateArticleFamily: () => void
    onDeleteArticleFamily: () => void
}

export default function ArticleFamiliesActions({ selectedArticleFamily, onDeleteArticleFamily, onUpdateArticleFamily }: Props) {
    const { t } = useTranslation()

    const [isUpdateArticleFamilyModalOpen, {open: openUpdateArticleFamilyModal, close: closeUpdateArticleFamilyModal}] = useModal()

    const [isArticleFamilyDetailsModalOpen, {open: openArticleFamilyDetailsModal, close: closeArticleFamilyDetailsModal}] = useModal()

    const [isConfirmationModalOpen, {open: openConfirmationModal, close: closeConfirmationModal}] = useModal()
    const [isDeletingArticleFamilyLoading, setDeletingArticleFamilyLoading] = useState(false)

    const confirmDeletingEmployee = async () => {
        setDeletingArticleFamilyLoading(true)
        try {
            await wait(2000)
            await articleFamiliesService.deleteArticleFamily(selectedArticleFamily.id)
            alertSuccess("Article family deleted successfully!")
            onDeleteArticleFamily()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingArticleFamilyLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                onShowDetailsBtnClick={openArticleFamilyDetailsModal}
                onUpdateBtnClick={openUpdateArticleFamilyModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isArticleFamilyDetailsModalOpen}
                onClose={closeArticleFamilyDetailsModal}
            >
                <ArticleFamilyDetails
                    articleFamily={selectedArticleFamily}
                />
            </InfoDetailsModal>

            <UpsertArticleFamilyModal
                title={t("components.upsertArticleFamilyModal.title.onUpdate")}
                isOpened={isUpdateArticleFamilyModalOpen}
                selectedArticlefamily={selectedArticleFamily}
                onClose={closeUpdateArticleFamilyModal}
                onSubmit={onUpdateArticleFamily}
            />

            <ConfirmationModal
                isLoading={isDeletingArticleFamilyLoading}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={confirmDeletingEmployee}
            >
                <Text size="md" fw={"bold"}>
                    {t("components.articleFamiliesActions.confirmationModal.message")}
                </Text>
            </ConfirmationModal>
        </>
    )
}