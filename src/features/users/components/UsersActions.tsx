import { ArrowsPointingOutIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Group, Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import usersService from "../services/users"
import ConfirmationModal from "../../../components/ConfirmationModal";
import { wait } from "../../../utils/helpers";
import { useState } from "react";
import User from "../../../types/User";
import { alertSuccess } from "../../../utils/feedback";
import UpsertUserModal, { UpsertUserDto } from "./UpsertUserModal";
import Role from "../../../types/Role";
import InfoDetailsModal from "../../../components/InfoDetailsModal";
import UserDetails from "./UserDetails";

interface Props {
    selectedUser: User
    roles: Role[]
    onUpdateUser: () => void
    onDeleteUser: () => void
}

export default function UsersActions({ selectedUser, roles, onDeleteUser, onUpdateUser }: Props) {
    const [isConfirmationDeletionLoading, setConfirmationDeletionLoading] = useState(false)
    const [isConfirmationModalOpened, { open: openConfirmationModal, close: closeConfirmationModal }] = useDisclosure(false);
    
    const [isSubmittingUpdateUser, setSubmittingUpdateUser] = useState(false)
    const [isUpdatingUserModalOpened, { open: openUpdatingUserModal, close: closeUpdatingUserModal }] = useDisclosure(false);

    const [isUserDetailsModalOpened, { open: openUserDetailsModal, close: closeUserDetailsModal }] = useDisclosure(false);

    const handleConfirmDeletion = async () => {
        setConfirmationDeletionLoading(true)

        try {
            await wait(2000)
            await usersService.deleteUser(selectedUser.id)
            alertSuccess("User account deleted successfully!")
            onDeleteUser()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setConfirmationDeletionLoading(false)
        }
    }

    const handleSubmitUpdatingUser = async (data: UpsertUserDto) => {
        setSubmittingUpdateUser(true)

        try {
            await wait(2000)
            await usersService.updateUser(selectedUser.id, data)
            alertSuccess("User account updated successfully!")

            onUpdateUser()
            closeUpdatingUserModal()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmittingUpdateUser(false)
        }
    }

    return (
        <>
            <Group gap={0} justify="flex-end">
                <ActionIcon variant="subtle" color="blue" onClick={openUserDetailsModal}>
                    <ArrowsPointingOutIcon style={{ width: rem(14), height: rem(14) }} />
                </ActionIcon>
                <ActionIcon variant="subtle" color="gray" onClick={openUpdatingUserModal}>
                    <PencilIcon style={{ width: rem(14), height: rem(14) }} />
                </ActionIcon>
                <ActionIcon variant="subtle" color="red" onClick={openConfirmationModal}>
                    <TrashIcon style={{ width: rem(14), height: rem(14) }} />
                </ActionIcon>
            </Group>

            <ConfirmationModal
                title="Confirmation"
                isLoading={isConfirmationDeletionLoading}
                isOpened={isConfirmationModalOpened}
                onCancel={closeConfirmationModal}
                onConfirm={handleConfirmDeletion}
            >
                <Text size="md" fw={"bold"}>
                    Are you sure you want to delete this user account?
                </Text>
                <Text size="sm">
                    This action is destructive and you will have
                    to contact support to restore your data.
                </Text>
            </ConfirmationModal>

            <UpsertUserModal
                title="Update user account"
                isOpened={isUpdatingUserModalOpened} 
                isSubmitting={isSubmittingUpdateUser}
                selectedUser={selectedUser}
                roles={roles}
                onCancel={closeUpdatingUserModal}
                onSubmit={handleSubmitUpdatingUser}
            />

            <InfoDetailsModal 
                title="Details"
                isOpened={isUserDetailsModalOpened}
                onClose={closeUserDetailsModal}
            >
                <UserDetails 
                    user={selectedUser}
                />
            </InfoDetailsModal>
        </>
    )
}