import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Group, rem } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
    onAddBtnClick: () => void
}

export default function DataTableControlPanel({ children, onAddBtnClick }: Props) {

    return (
        <>
            <Group justify="space-between">
                <Group gap={0} justify="flex-end">
                    {" "}
                </Group>
                <Group gap={"xs"} justify="flex-end">
                    <Button
                        onClick={onAddBtnClick}
                        leftSection={<PlusIcon style={{ width: rem(14), height: rem(14) }} />}
                        variant="light"
                    >
                        New
                    </Button>
                </Group>
            </Group>

            {children}
        </>
    )
}