import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Group, rem } from "@mantine/core";
import UpsertUserModal, { UpsertUserDto } from "./UpsertUserModal";
import { useDisclosure } from "@mantine/hooks";
import Role from "../../../types/Role";
import { useState } from "react";
import { wait } from "../../../utils/helpers";
import usersService from '../services/users';
import { alertSuccess } from "../../../utils/feedback";

interface Props {
    roles: Role[]
    onCreateUser: () => void
}

export default function UsersControls({ roles, onCreateUser }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    const handleCancel = () => {
        console.log("cancel");
        close()
    }

    const handleSubmitCreatingUser = async (data: UpsertUserDto) => {
        setIsSubmitting(true)

        try {
            await wait(2000)
            await usersService.createUser(data)
            alertSuccess("New user account created successfully!")

            onCreateUser()
            close()
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Group justify="space-between">
                <Group gap={0} justify="flex-end">
                    {" "}
                </Group>
                <Group gap={"xs"} justify="flex-end">
                    <Button
                        onClick={open}
                        leftSection={<PlusIcon style={{ width: rem(14), height: rem(14) }} />}
                        variant="light"
                    >
                        New user
                    </Button>
                </Group>
            </Group>

            <UpsertUserModal
                title="Create user account"
                isOpened={opened}
                isSubmitting={isSubmitting}
                roles={roles}
                onCancel={handleCancel}
                onSubmit={handleSubmitCreatingUser}
            />
        </>
    )
}