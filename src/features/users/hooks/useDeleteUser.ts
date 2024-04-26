import { useDisclosure } from "@mantine/hooks";
import usersService from "../services"
import { wait } from "../../../utils/helpers";
import { useState } from "react";
import User from "../../../types/User";
import { alertSuccess } from "../../../utils/feedback";

interface Props {
    selectedUser: User
    onDeleteUser: () => void
}

export default function useDeleteUser({ selectedUser, onDeleteUser }: Props) {
    const [isDeletingUserLoading, setDeletingUserLoading] = useState(false)
    const [isConfirmationModalOpen, { open: openConfirmationModal, close: closeConfirmationModal }] = useDisclosure(false);

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

    return {
        isDeletingUserLoading,
        isConfirmationModalOpen,
        openConfirmationModal,
        closeConfirmationModal,
        confirmDeletingUser
    }
}