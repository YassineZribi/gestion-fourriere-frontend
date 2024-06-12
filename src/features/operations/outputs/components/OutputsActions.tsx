import { useState } from "react";
import { ActionIcon, Text, rem } from "@mantine/core";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import InfoDetailsModal from "../../../../components/InfoDetailsModal";
import TRowActions from "../../../../components/DataTable/TRowActions";
import useModal from "../../../../hooks/useModal";
import outputsService from "../services"
import { wait } from "../../../../utils/helpers";
import { alertSuccess } from "../../../../utils/feedback";
import { useTranslation } from "react-i18next";
import OutputDetails from "./OutputDetails";
import { useNavigate } from "react-router-dom";
import Output from "../../../../types/Output";

interface Props {
    selectedOutput: Output
    onDeleteOutput: () => void
}

export default function OutputsActions({ selectedOutput, onDeleteOutput }: Props) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [isOutputDetailsModalOpen, { open: openOutputDetailsModal, close: closeOutputDetailsModal }] = useModal()

    const [isConfirmationModalOpen, { open: openConfirmationModal, close: closeConfirmationModal }] = useModal()
    const [isDeletingOutputLoading, setDeletingOutputLoading] = useState(false)

    const confirmDeletingEmployee = async () => {
        setDeletingOutputLoading(true)
        try {
            await wait(2000)
            await outputsService.deleteOutput(selectedOutput.id)
            alertSuccess("Output deleted successfully!")
            onDeleteOutput()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingOutputLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                onShowDetailsBtnClick={openOutputDetailsModal}
                hideUpdateBtn
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isOutputDetailsModalOpen}
                onClose={closeOutputDetailsModal}
            >
                <OutputDetails
                    output={selectedOutput}
                />
            </InfoDetailsModal>

            <ConfirmationModal
                isLoading={isDeletingOutputLoading}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={confirmDeletingEmployee}
            >
                <Text size="md" fw={"bold"}>
                    {t("components.outputsActions.confirmationModal.message")}
                </Text>
            </ConfirmationModal>
        </>
    )
}