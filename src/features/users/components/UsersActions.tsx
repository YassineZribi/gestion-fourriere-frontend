import { ArrowsPointingOutIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Group, Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import usersService from "../services/users"
import ConfirmationModal from "../../../components/ConfirmationModal";
import { wait } from "../../../utils/helpers";
import { useState } from "react";
import User from "../../../types/User";
import { alertSuccess } from "../../../utils/feedback";

interface Props {
    selectedUser: User
    onUpdateUser: () => void
    onDeleteUser: () => void
}

export default function UsersActions({ selectedUser, onDeleteUser, onUpdateUser }: Props) {
    const [isCondirmationDeletionLoading, setConfirmationDeletionLoading] = useState(false)
    const [isConfirmationModalOpened, { open: openConfirmationModal, close: closeConfirmationModal }] = useDisclosure(false);

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

    return (
        <>
            <Group gap={0} justify="flex-end">
                <ActionIcon variant="subtle" color="blue">
                    <ArrowsPointingOutIcon style={{ width: rem(14), height: rem(14) }} />
                </ActionIcon>
                <ActionIcon variant="subtle" color="gray">
                    <PencilIcon style={{ width: rem(14), height: rem(14) }} />
                </ActionIcon>
                <ActionIcon variant="subtle" color="red" onClick={openConfirmationModal}>
                    <TrashIcon style={{ width: rem(14), height: rem(14) }} />
                </ActionIcon>
            </Group>

            <ConfirmationModal
                title="Confirmation"
                isLoading={isCondirmationDeletionLoading}
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
        </>
    )
}