import { ArrowsPointingOutIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Group, rem } from "@mantine/core";
import { CSSProperties, ReactNode } from "react";

interface Props {
    hideUpdateBtn?: boolean
    hideDeleteBtn?: boolean
    startSection?: ReactNode
    actionSize?: CSSProperties['width']
    onShowDetailsBtnClick: () => void;
    onUpdateBtnClick: () => void;
    onConfirmBtnClick: () => void;
}

export default function TRowActions({ hideUpdateBtn, hideDeleteBtn, actionSize = rem(14), startSection, onShowDetailsBtnClick, onUpdateBtnClick, onConfirmBtnClick }: Props) {
    return (
        <Group gap={0} justify="flex-end">
            {startSection}
            <ActionIcon variant="subtle" color="blue" onClick={onShowDetailsBtnClick}>
                <ArrowsPointingOutIcon style={{ width: actionSize, height: actionSize }} />
            </ActionIcon>
            {
                !hideUpdateBtn && (
                    <ActionIcon variant="subtle" color="gray" onClick={onUpdateBtnClick}>
                        <PencilIcon style={{ width: actionSize, height: actionSize }} />
                    </ActionIcon>
                )
            }
            {
                !hideDeleteBtn && (
                    <ActionIcon variant="subtle" color="red" onClick={onConfirmBtnClick}>
                        <TrashIcon style={{ width: actionSize, height: actionSize }} />
                    </ActionIcon>
                )
            }
        </Group>
    )
}