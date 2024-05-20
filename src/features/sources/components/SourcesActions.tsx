import { useState } from "react";
import { Text } from "@mantine/core";
import ConfirmationModal from "../../../components/ConfirmationModal";
import UpsertSourceModal from "./UpsertSourceModal";
import InfoDetailsModal from "../../../components/InfoDetailsModal";
import SourceDetails from "./SourceDetails";
import TRowActions from "../../../components/DataTable/TRowActions";
import useModal from "../../../hooks/useModal";
import sourcesService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import { useTranslation } from "react-i18next";
import Source from "../../../types/Source";

interface Props {
    selectedSource: Source
    onUpdateSource: () => void
    onDeleteSource: () => void
}

export default function SourcesActions({ selectedSource, onDeleteSource, onUpdateSource }: Props) {
    const {t} = useTranslation()

    const [isUpdateSourceModalOpen, {open: openUpdateSourceModal, close: closeUpdateSourceModal}] = useModal()

    const [isSourceDetailsModalOpen, {open: openSourceDetailsModal, close: closeSourceDetailsModal}] = useModal()

    const [isConfirmationModalOpen, {open: openConfirmationModal, close: closeConfirmationModal}] = useModal()
    const [isDeletingSourceLoading, setDeletingSourceLoading] = useState(false)

    const confirmDeletingSource = async () => {
        setDeletingSourceLoading(true)
        try {
            await wait(2000)
            await sourcesService.deleteSource(selectedSource.id)
            alertSuccess("Source deleted successfully!")
            onDeleteSource()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingSourceLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                onShowDetailsBtnClick={openSourceDetailsModal}
                onUpdateBtnClick={openUpdateSourceModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isSourceDetailsModalOpen}
                onClose={closeSourceDetailsModal}
            >
                <SourceDetails
                    source={selectedSource}
                />
            </InfoDetailsModal>

            <UpsertSourceModal
                title={t("components.upsertSourceModal.title.onUpdate")}
                isOpened={isUpdateSourceModalOpen}
                selectedSource={selectedSource}
                onClose={closeUpdateSourceModal}
                onSubmit={onUpdateSource}
            />

            <ConfirmationModal
                isLoading={isDeletingSourceLoading}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={confirmDeletingSource}
            >
                <Text size="md" fw={"bold"}>
                    {t("components.sourcesActions.confirmationModal.message")}
                </Text>
            </ConfirmationModal>
        </>
    )
}