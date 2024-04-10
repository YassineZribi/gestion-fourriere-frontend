import { Button, Group, Modal } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
    isOpened: boolean
    title: string
    children: ReactNode
    onClose: () => void
}

export default function InfoDetailsModal({ isOpened, title, children, onClose }: Props) {
    return (
        <Modal opened={isOpened} onClose={onClose} title={title}>
            {children}
            <Group justify="flex-end" mt="xl">
                <Button type="submit" onClick={onClose}>
                    Close
                </Button>
            </Group>
        </Modal>
    )
}