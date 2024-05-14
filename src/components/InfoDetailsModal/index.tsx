import { Button, Group, Modal } from "@mantine/core";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    isOpened: boolean
    children: ReactNode
    onClose: () => void
}

export default function InfoDetailsModal({ isOpened, children, onClose }: Props) {
    const { t } = useTranslation()
    
    return (
        <Modal opened={isOpened} onClose={onClose} title={t("components.infoDetailsModal.title")}>
            {children}
            <Group justify="flex-end" mt="xl">
                <Button type="submit" onClick={onClose}>
                    {t("buttons.close")}
                </Button>
            </Group>
        </Modal>
    )
}