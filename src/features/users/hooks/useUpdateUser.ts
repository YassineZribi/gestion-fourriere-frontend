import { useDisclosure } from "@mantine/hooks";
import usersService from "../services/users"
import { wait } from "../../../utils/helpers";
import { useState } from "react";
import User from "../../../types/User";
import { alertSuccess } from "../../../utils/feedback";
import { UpsertUserDto } from "../components/UpsertUserModal";

interface Props {
    selectedUser: User
    onUpdateUser: () => void
}

export default function useUpdateUser({ selectedUser, onUpdateUser }: Props) {

    const [isUpdatingUserSubmitting, setSubmitting] = useState(false)
    const [isUpdatingUserModalOpen, { open: openUpdateUserModal, close: closeUpdateUserModal }] = useDisclosure(false);

    const submitUpdatingUser = async (data: UpsertUserDto) => {
        setSubmitting(true)

        try {
            await wait(2000)
            await usersService.updateUser(selectedUser.id, data)
            alertSuccess("User account updated successfully!")

            onUpdateUser()
            closeUpdateUserModal()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return {
        isUpdatingUserSubmitting,
        isUpdatingUserModalOpen,
        openUpdateUserModal,
        closeUpdateUserModal,
        submitUpdatingUser
    }
}