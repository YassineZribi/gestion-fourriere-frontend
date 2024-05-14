import { useState } from "react";
import { Text } from "@mantine/core";
import ConfirmationModal from "../../../components/ConfirmationModal";
import InfoDetailsModal from "../../../components/InfoDetailsModal";
import WarehouseDetails from "./WarehouseDetails";
import TRowActions from "../../../components/DataTable/TRowActions";
import useModal from "../../../hooks/useModal";
import warehousesService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import Warehouse from "../../../types/Warehouse";
import UpsertWarehouseModal from "./UpsertWarehouseModal";
import { useTranslation } from "react-i18next";

interface Props {
    selectedWarehouse: Warehouse
    onUpdateWarehouse: () => void
    onDeleteWarehouse: () => void
}

export default function WarehousesActions({ selectedWarehouse, onDeleteWarehouse, onUpdateWarehouse }: Props) {
    const { t } = useTranslation()

    const [isUpdateWarehouseModalOpen, {open: openUpdateWarehouseModal, close: closeUpdateWarehouseModal}] = useModal()

    const [isWarehouseDetailsModalOpen, {open: openWarehouseDetailsModal, close: closeWarehouseDetailsModal}] = useModal()

    const [isConfirmationModalOpen, {open: openConfirmationModal, close: closeConfirmationModal}] = useModal()
    const [isDeletingWarehouseLoading, setDeletingWarehouseLoading] = useState(false)

    const confirmDeletingEmployee = async () => {
        setDeletingWarehouseLoading(true)
        try {
            await wait(2000)
            await warehousesService.deleteWarehouse(selectedWarehouse.id)
            alertSuccess("Warehouse deleted successfully!")
            onDeleteWarehouse()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingWarehouseLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                onShowDetailsBtnClick={openWarehouseDetailsModal}
                onUpdateBtnClick={openUpdateWarehouseModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isWarehouseDetailsModalOpen}
                onClose={closeWarehouseDetailsModal}
            >
                <WarehouseDetails
                    warehouse={selectedWarehouse}
                />
            </InfoDetailsModal>

            <UpsertWarehouseModal
                title={t("components.upsertWarehouseModal.title.onUpdate")}
                isOpened={isUpdateWarehouseModalOpen}
                selectedWarehouse={selectedWarehouse}
                onClose={closeUpdateWarehouseModal}
                onSubmit={onUpdateWarehouse}
            />

            <ConfirmationModal
                isLoading={isDeletingWarehouseLoading}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={confirmDeletingEmployee}
            >
                <Text size="md" fw={"bold"}>
                    {t("components.warehousesActions.confirmationModal.message")}
                </Text>
            </ConfirmationModal>
        </>
    )
}