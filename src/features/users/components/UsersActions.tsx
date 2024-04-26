import { Text } from "@mantine/core";
import ConfirmationModal from "../../../components/ConfirmationModal";
import User from "../../../types/User";
import UpsertUserModal from "./UpsertUserModal";
import InfoDetailsModal from "../../../components/InfoDetailsModal";
import UserDetails from "./UserDetails";
import TRowActions from "../../../components/DataTable/TRowActions";
import useDeleteUser from "../hooks/useDeleteUser";
import useUpdateUser from "../hooks/useUpdateUser";
import useShowUserDetails from "../hooks/useShowUserDetails";

interface Props {
    selectedUser: User
    onUpdateUser: () => void
    onDeleteUser: () => void
}

export default function UsersActions({ selectedUser, onDeleteUser, onUpdateUser }: Props) {
    const {
        isDeletingUserLoading,
        isConfirmationModalOpen,
        openConfirmationModal,
        closeConfirmationModal,
        confirmDeletingUser
    } = useDeleteUser({ selectedUser, onDeleteUser })

    const {
        isUpdatingUserSubmitting,
        isUpdatingUserModalOpen,
        openUpdateUserModal,
        closeUpdateUserModal,
        submitUpdatingUser
    } = useUpdateUser({ selectedUser, onUpdateUser })

    const {
        isUserDetailsModalOpen,
        openUserDetailsModal,
        closeUserDetailsModal
    } = useShowUserDetails()

    return (
        <>
            <TRowActions
                onShowDetailsBtnClick={openUserDetailsModal}
                onUpdateBtnClick={openUpdateUserModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                title="Details"
                isOpened={isUserDetailsModalOpen}
                onClose={closeUserDetailsModal}
            >
                <UserDetails
                    user={selectedUser}
                />
            </InfoDetailsModal>

            <UpsertUserModal
                title="Update user account"
                isOpened={isUpdatingUserModalOpen}
                isSubmitting={isUpdatingUserSubmitting}
                selectedUser={selectedUser}
                onCancel={closeUpdateUserModal}
                onSubmit={submitUpdatingUser}
            />

            <ConfirmationModal
                title="Confirmation"
                isLoading={isDeletingUserLoading}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={confirmDeletingUser}
            >
                <Text size="md" fw={"bold"}>
                    Are you sure you want to delete this user account?
                </Text>
            </ConfirmationModal>
        </>
    )
}