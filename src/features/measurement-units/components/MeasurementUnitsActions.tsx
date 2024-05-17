import { useState } from "react";
import { Text } from "@mantine/core";
import ConfirmationModal from "../../../components/ConfirmationModal";
import UpsertMeasurementUnitModal from "./UpsertMeasurementUnitModal";
import InfoDetailsModal from "../../../components/InfoDetailsModal";
import MeasurementUnitDetails from "./MeasurementUnitDetails";
import TRowActions from "../../../components/DataTable/TRowActions";
import useModal from "../../../hooks/useModal";
import measurementUnitsService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import { useTranslation } from "react-i18next";
import MeasurementUnit from "../../../types/MeasurementUnit";

interface Props {
    selectedMeasurementUnit: MeasurementUnit
    onUpdateMeasurementUnit: () => void
    onDeleteMeasurementUnit: () => void
}

export default function MeasurementUnitsActions({ selectedMeasurementUnit, onDeleteMeasurementUnit, onUpdateMeasurementUnit }: Props) {
    const {t} = useTranslation()

    const [isUpdateMeasurementUnitModalOpen, {open: openUpdateMeasurementUnitModal, close: closeUpdateMeasurementUnitModal}] = useModal()

    const [isMeasurementUnitDetailsModalOpen, {open: openMeasurementUnitDetailsModal, close: closeMeasurementUnitDetailsModal}] = useModal()

    const [isConfirmationModalOpen, {open: openConfirmationModal, close: closeConfirmationModal}] = useModal()
    const [isDeletingMeasurementUnitLoading, setDeletingMeasurementUnitLoading] = useState(false)

    const confirmDeletingMeasurementUnit = async () => {
        setDeletingMeasurementUnitLoading(true)
        try {
            await wait(2000)
            await measurementUnitsService.deleteMeasurementUnit(selectedMeasurementUnit.id)
            alertSuccess("Measurement unit deleted successfully!")
            onDeleteMeasurementUnit()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingMeasurementUnitLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                onShowDetailsBtnClick={openMeasurementUnitDetailsModal}
                onUpdateBtnClick={openUpdateMeasurementUnitModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isMeasurementUnitDetailsModalOpen}
                onClose={closeMeasurementUnitDetailsModal}
            >
                <MeasurementUnitDetails
                    measurementUnit={selectedMeasurementUnit}
                />
            </InfoDetailsModal>

            <UpsertMeasurementUnitModal
                title={t("components.upsertMeasurementUnitModal.title.onUpdate")}
                isOpened={isUpdateMeasurementUnitModalOpen}
                selectedMeasurementUnit={selectedMeasurementUnit}
                onClose={closeUpdateMeasurementUnitModal}
                onSubmit={onUpdateMeasurementUnit}
            />

            <ConfirmationModal
                isLoading={isDeletingMeasurementUnitLoading}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={confirmDeletingMeasurementUnit}
            >
                <Text size="md" fw={"bold"}>
                    {t("components.measurementUnitsActions.confirmationModal.message")}
                </Text>
            </ConfirmationModal>
        </>
    )
}