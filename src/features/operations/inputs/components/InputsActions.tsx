import { useState } from "react";
import { ActionIcon, Text, rem } from "@mantine/core";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import InfoDetailsModal from "../../../../components/InfoDetailsModal";
import TRowActions from "../../../../components/DataTable/TRowActions";
import useModal from "../../../../hooks/useModal";
import inoutsService from "../services"
import { wait } from "../../../../utils/helpers";
import { alertSuccess } from "../../../../utils/feedback";
import Input from "../../../../types/Input";
import { useTranslation } from "react-i18next";
import InputDetails from "./InputDetails";
import { useNavigate } from "react-router-dom";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { FULLY_OUT } from "../../../../types/ProcessingStatus";

interface Props {
    selectedInput: Input
    onDeleteInput: () => void
}

export default function InputsActions({ selectedInput, onDeleteInput }: Props) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [isInputDetailsModalOpen, { open: openInputDetailsModal, close: closeInputDetailsModal }] = useModal()

    const [isConfirmationModalOpen, { open: openConfirmationModal, close: closeConfirmationModal }] = useModal()
    const [isDeletingInputLoading, setDeletingInputLoading] = useState(false)

    const confirmDeletingEmployee = async () => {
        setDeletingInputLoading(true)
        try {
            await wait(2000)
            await inoutsService.deleteInput(selectedInput.id)
            alertSuccess("Input deleted successfully!")
            onDeleteInput()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingInputLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                startSection={
                    selectedInput.status !== FULLY_OUT && (
                        <ActionIcon variant="subtle" color="teal" onClick={() => navigate("/create-output?inputId=" + selectedInput.id) }>
                            <ArrowsRightLeftIcon style={{ width: rem(14), height: rem(14) }} />
                        </ActionIcon>
                    )
                }
                onShowDetailsBtnClick={openInputDetailsModal}
                onUpdateBtnClick={() => navigate("/update-input/" + selectedInput.id)}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isInputDetailsModalOpen}
                onClose={closeInputDetailsModal}
            >
                <InputDetails
                    input={selectedInput}
                />
            </InfoDetailsModal>

            <ConfirmationModal
                isLoading={isDeletingInputLoading}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={confirmDeletingEmployee}
            >
                <Text size="md" fw={"bold"}>
                    {t("components.inputsActions.confirmationModal.message")}
                </Text>
            </ConfirmationModal>
        </>
    )
}