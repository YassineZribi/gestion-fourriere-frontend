import { useState } from "react";
import { Text } from "@mantine/core";
import ConfirmationModal from "../../../components/ConfirmationModal";
import InfoDetailsModal from "../../../components/InfoDetailsModal";
import SubRegisterDetails from "./SubRegisterDetails";
import TRowActions from "../../../components/DataTable/TRowActions";
import useModal from "../../../hooks/useModal";
import subRegistersService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import SubRegister from "../../../types/SubRegister";
import UpsertSubRegisterModal from "./UpsertSubRegisterModal";
import { useTranslation } from "react-i18next";

interface Props {
    selectedSubRegister: SubRegister
    onUpdateSubRegister: () => void
    onDeleteSubRegister: () => void
}

export default function SubRegistersActions({ selectedSubRegister, onDeleteSubRegister, onUpdateSubRegister }: Props) {
    const { t } = useTranslation()

    const [isUpdateSubRegisterModalOpen, {open: openUpdateSubRegisterModal, close: closeUpdateSubRegisterModal}] = useModal()

    const [isSubRegisterDetailsModalOpen, {open: openSubRegisterDetailsModal, close: closeSubRegisterDetailsModal}] = useModal()

    const [isConfirmationModalOpen, {open: openConfirmationModal, close: closeConfirmationModal}] = useModal()
    const [isDeletingSubRegisterLoading, setDeletingSubRegisterLoading] = useState(false)

    const confirmDeletingEmployee = async () => {
        setDeletingSubRegisterLoading(true)
        try {
            await wait(2000)
            await subRegistersService.deleteSubRegister(selectedSubRegister.id)
            alertSuccess("Sub-register deleted successfully!")
            onDeleteSubRegister()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingSubRegisterLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                onShowDetailsBtnClick={openSubRegisterDetailsModal}
                onUpdateBtnClick={openUpdateSubRegisterModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isSubRegisterDetailsModalOpen}
                onClose={closeSubRegisterDetailsModal}
            >
                <SubRegisterDetails
                    subRegister={selectedSubRegister}
                />
            </InfoDetailsModal>

            <UpsertSubRegisterModal
                title={t("components.upsertSubRegisterModal.title.onUpdate")}
                isOpened={isUpdateSubRegisterModalOpen}
                selectedSubRegister={selectedSubRegister}
                onClose={closeUpdateSubRegisterModal}
                onSubmit={onUpdateSubRegister}
            />

            <ConfirmationModal
                isLoading={isDeletingSubRegisterLoading}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={confirmDeletingEmployee}
            >
                <Text size="md" fw={"bold"}>
                    {t("components.subRegistersActions.confirmationModal.message")}
                </Text>
            </ConfirmationModal>
        </>
    )
}