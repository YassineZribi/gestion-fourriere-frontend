import { UpsertUserDto } from "../components/UpsertUserModal";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { wait } from "../../../utils/helpers";
import usersService from '../services/users';
import { alertSuccess } from "../../../utils/feedback";

interface Props {
    onCreateUser: () => void
}

export default function useAddUser({ onCreateUser }: Props) {
    const [isAddingUserSubmitting, setSubmitting] = useState(false);
    const [isAddUserModalOpen, { open: openAddUserModal, close: closeAddUserModal}] = useDisclosure(false);

    const submitCreatingUser = async (data: UpsertUserDto) => {
        setSubmitting(true)

        try {
            await wait(2000)
            await usersService.createUser(data)
            alertSuccess("New user account created successfully!")

            onCreateUser()
            closeAddUserModal()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return {
        isAddingUserSubmitting,
        isAddUserModalOpen,
        openAddUserModal,
        closeAddUserModal,
        submitCreatingUser
    }

    
}