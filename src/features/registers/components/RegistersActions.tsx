import { useState } from "react";
import { Text } from "@mantine/core";
import ConfirmationModal from "../../../components/ConfirmationModal";
import UpsertRegisterModal from "./UpsertRegisterModal";
import InfoDetailsModal from "../../../components/InfoDetailsModal";
import RegisterDetails from "./RegisterDetails";
import TRowActions from "../../../components/DataTable/TRowActions";
import useModal from "../../../hooks/useModal";
import registersService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import { useTranslation } from "react-i18next";
import Register from "../../../types/Register";

interface Props {
    selectedRegister: Register
    onUpdateRegister: () => void
    onDeleteRegister: () => void
}

export default function RegistersActions({ selectedRegister, onDeleteRegister, onUpdateRegister }: Props) {
    const {t} = useTranslation()

    const [isUpdateRegisterModalOpen, {open: openUpdateRegisterModal, close: closeUpdateRegisterModal}] = useModal()

    const [isRegisterDetailsModalOpen, {open: openRegisterDetailsModal, close: closeRegisterDetailsModal}] = useModal()

    const [isConfirmationModalOpen, {open: openConfirmationModal, close: closeConfirmationModal}] = useModal()
    const [isDeletingRegisterLoading, setDeletingRegisterLoading] = useState(false)

    const confirmDeletingRegister = async () => {
        setDeletingRegisterLoading(true)
        try {
            await wait(2000)
            await registersService.deleteRegister(selectedRegister.id)
            alertSuccess("Register deleted successfully!")
            onDeleteRegister()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingRegisterLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                onShowDetailsBtnClick={openRegisterDetailsModal}
                onUpdateBtnClick={openUpdateRegisterModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isRegisterDetailsModalOpen}
                onClose={closeRegisterDetailsModal}
            >
                <RegisterDetails
                    register={selectedRegister}
                />
            </InfoDetailsModal>

            <UpsertRegisterModal
                title={t("components.upsertRegisterModal.title.onUpdate")}
                isOpened={isUpdateRegisterModalOpen}
                selectedRegister={selectedRegister}
                onClose={closeUpdateRegisterModal}
                onSubmit={onUpdateRegister}
            />

            <ConfirmationModal
                isLoading={isDeletingRegisterLoading}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={confirmDeletingRegister}
            >
                <Text size="md" fw={"bold"}>
                    {t("components.registersActions.confirmationModal.message")}
                </Text>
            </ConfirmationModal>
        </>
    )
}