import { useState } from "react";
import { Text } from "@mantine/core";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import UpsertIndividualModal from "./UpsertIndividualModal";
import InfoDetailsModal from "../../../../components/InfoDetailsModal";
import IndividualDetails from "./IndividualDetails";
import TRowActions from "../../../../components/DataTable/TRowActions";
import useModal from "../../../../hooks/useModal";
import individualsService from "../services"
import { wait } from "../../../../utils/helpers";
import { alertSuccess } from "../../../../utils/feedback";
import { useTranslation } from "react-i18next";
import Individual from "../../../../types/Individual";

interface Props {
    selectedIndividual: Individual
    hideUpdateBtn?: boolean
    hideDeleteBtn?: boolean
    onUpdateIndividual: () => void
    onDeleteIndividual: () => void
}

export default function IndividualsActions({ selectedIndividual, hideUpdateBtn, hideDeleteBtn, onDeleteIndividual, onUpdateIndividual }: Props) {
    const { t } = useTranslation()

    const [isUpdateIndividualModalOpen, { open: openUpdateIndividualModal, close: closeUpdateIndividualModal }] = useModal()

    const [isIndividualDetailsModalOpen, { open: openIndividualDetailsModal, close: closeIndividualDetailsModal }] = useModal()

    const [isConfirmationModalOpen, { open: openConfirmationModal, close: closeConfirmationModal }] = useModal()
    const [isDeletingIndividualLoading, setDeletingIndividualLoading] = useState(false)

    const confirmDeletingIndividual = async () => {
        setDeletingIndividualLoading(true)
        try {
            await wait(2000)
            await individualsService.deleteIndividual(selectedIndividual.id)
            alertSuccess("Individual deleted successfully!")
            onDeleteIndividual()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingIndividualLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                hideUpdateBtn={hideUpdateBtn}
                hideDeleteBtn={hideDeleteBtn}
                onShowDetailsBtnClick={openIndividualDetailsModal}
                onUpdateBtnClick={openUpdateIndividualModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isIndividualDetailsModalOpen}
                onClose={closeIndividualDetailsModal}
            >
                <IndividualDetails
                    individual={selectedIndividual}
                />
            </InfoDetailsModal>

            {
                !hideUpdateBtn && (
                    <UpsertIndividualModal
                        title={t("components.upsertIndividualModal.title.onUpdate")}
                        isOpened={isUpdateIndividualModalOpen}
                        selectedIndividual={selectedIndividual}
                        onClose={closeUpdateIndividualModal}
                        onSubmit={onUpdateIndividual}
                    />
                )
            }

            {
                !hideDeleteBtn && (
                    <ConfirmationModal
                        isLoading={isDeletingIndividualLoading}
                        isOpened={isConfirmationModalOpen}
                        onCancel={closeConfirmationModal}
                        onConfirm={confirmDeletingIndividual}
                    >
                        <Text size="md" fw={"bold"}>
                            {t("components.individualsActions.confirmationModal.message")}
                        </Text>
                    </ConfirmationModal>
                )
            }

        </>
    )
}