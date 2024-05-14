import { useState } from "react";
import { Text } from "@mantine/core";
import ConfirmationModal from "../../../components/ConfirmationModal";
import User from "../../../types/User";
import UpsertUserModal from "./UpsertUserModal";
import InfoDetailsModal from "../../../components/InfoDetailsModal";
import UserDetails from "./UserDetails";
import TRowActions from "../../../components/DataTable/TRowActions";
import useModal from "../../../hooks/useModal";
import usersService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import { useTranslation } from "react-i18next";

interface Props {
    selectedUser: User
    onUpdateUser: () => void
    onDeleteUser: () => void
}

export default function UsersActions({ selectedUser, onDeleteUser, onUpdateUser }: Props) {
    const { t } = useTranslation();

    const [isUpdateUserModalOpen, {open: openUpdateUserModal, close: closeUpdateUserModal}] = useModal()

    const [isUserDetailsModalOpen, {open: openUserDetailsModal, close: closeUserDetailsModal}] = useModal()

    const [isConfirmationModalOpen, {open: openConfirmationModal, close: closeConfirmationModal}] = useModal()
    const [isDeletingUserLoading, setDeletingUserLoading] = useState(false)

    const confirmDeletingUser = async () => {
        setDeletingUserLoading(true)
        try {
            await wait(2000)
            await usersService.deleteUser(selectedUser.id)
            alertSuccess("User account deleted successfully!")
            onDeleteUser()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingUserLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                onShowDetailsBtnClick={openUserDetailsModal}
                onUpdateBtnClick={openUpdateUserModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isUserDetailsModalOpen}
                onClose={closeUserDetailsModal}
            >
                <UserDetails
                    user={selectedUser}
                />
            </InfoDetailsModal>

            <UpsertUserModal
                title={t("components.upsertUserModal.title.onUpdate")}
                isOpened={isUpdateUserModalOpen}
                selectedUser={selectedUser}
                onClose={closeUpdateUserModal}
                onSubmit={onUpdateUser}
            />

            <ConfirmationModal
                isLoading={isDeletingUserLoading}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={confirmDeletingUser}
            >
                <Text size="md" fw={"bold"}>
                    {t("components.usersActions.confirmationModal.message")}
                </Text>
            </ConfirmationModal>
        </>
    )
}