import { Anchor, Button, Group, Modal, Text } from "@mantine/core";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    isOpened: boolean
    isLoading: boolean
    children: ReactNode
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmationModal({ isOpened, isLoading, children, onCancel, onConfirm }: Props) {
    const { t } = useTranslation()

    return (
        <Modal opened={isOpened} onClose={onCancel} title={t("components.confirmationModal.title")}>
            {children}
            <Text size="sm">
                {t("components.confirmationModal.text")}
            </Text>
            <Group justify="space-between" mt="xl">
                <Anchor component="button" type="button" variant="gradient" onClick={onCancel} size="sm">
                    {t("buttons.cancel")}
                </Anchor>
                <Button type="submit" color="red" disabled={isLoading} loading={isLoading} onClick={onConfirm}>
                    {t("buttons.confirm")}
                </Button>
            </Group>
        </Modal>
    )
}