import { PlusIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { Button, Group, rem } from "@mantine/core";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    children?: ReactNode
    onAddBtnClick?: () => void
    onGeneratePdfBtnClick?: () => void
    isGeneratingPdf?: boolean
}

export default function DataTableControlPanel({ children, isGeneratingPdf, onAddBtnClick, onGeneratePdfBtnClick }: Props) {
    const { t } = useTranslation()
    return (
        <>
            <Group justify="space-between">
                <Group gap={0} justify="flex-end">
                    {" "}
                </Group>
                <Group gap={"xs"} justify="flex-end">
                    {onGeneratePdfBtnClick && (
                        <Button
                            onClick={onGeneratePdfBtnClick}
                            leftSection={<PrinterIcon style={{ width: rem(14), height: rem(14) }} />}
                            disabled={isGeneratingPdf}
                            loading={isGeneratingPdf}
                            variant="default"
                        >
                            PDF
                        </Button>
                    )}
                    {onAddBtnClick && (
                        <Button
                            onClick={onAddBtnClick}
                            leftSection={<PlusIcon style={{ width: rem(14), height: rem(14) }} />}
                            variant="light"
                        >
                            {t("buttons.add")}
                        </Button>
                    )}
                </Group>
            </Group>

            {children}
        </>
    )
}