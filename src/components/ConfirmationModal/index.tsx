import { Anchor, Button, Group, Modal, Text } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
    isOpened: boolean
    isLoading: boolean
    title: string
    children: ReactNode
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmationModal({ isOpened, isLoading, title, children, onCancel, onConfirm }: Props) {
    return (
        <Modal opened={isOpened} onClose={onCancel} title={title}>
            {children}
            <Text size="sm">
                This action is destructive and you will have
                to contact support to restore your data.
            </Text>
            <Group justify="space-between" mt="xl">
                <Anchor component="button" type="button" variant="gradient" onClick={onCancel} size="sm">
                    Cancel
                </Anchor>
                <Button type="submit" color="red" disabled={isLoading} loading={isLoading} onClick={onConfirm}>
                    Confirm
                </Button>
            </Group>
        </Modal>
    )
}