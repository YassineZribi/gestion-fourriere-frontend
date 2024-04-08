import { ArrowsPointingOutIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Box, Button, Group, rem } from "@mantine/core";
import CreateUserModal from "./CreateUserModal";
import { useDisclosure } from "@mantine/hooks";
import Role from "../../../types/Role";

interface Props {
    roles: Role[]
    onCreateUser: () => void
}

export default function UsersControls({ roles, onCreateUser }: Props) {
    const [opened, { open, close }] = useDisclosure(false);

    const handleCancel = () => {
        console.log("cancel");
        close()
    }

    const handleSubmit = () => {
        onCreateUser()
        close()
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

            <CreateUserModal 
                title="Create user account"
                isOpened={opened} 
                roles={roles}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            />
        </>
    )
}