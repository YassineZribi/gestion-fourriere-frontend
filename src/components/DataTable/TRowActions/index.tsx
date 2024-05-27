import { ArrowsPointingOutIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Group, rem } from "@mantine/core";

interface Props {
    hideUpdateBtn?: boolean
    hideDeleteBtn?: boolean
    onShowDetailsBtnClick: () => void;
    onUpdateBtnClick: () => void;
    onConfirmBtnClick: () => void;
}

export default function TRowActions({ hideUpdateBtn, hideDeleteBtn, onShowDetailsBtnClick, onUpdateBtnClick, onConfirmBtnClick }: Props) {
    return (
        <Group gap={0} justify="flex-end">
            <ActionIcon variant="subtle" color="blue" onClick={onShowDetailsBtnClick}>
                <ArrowsPointingOutIcon style={{ width: rem(14), height: rem(14) }} />
            </ActionIcon>
            {
                !hideUpdateBtn && (
                    <ActionIcon variant="subtle" color="gray" onClick={onUpdateBtnClick}>
                        <PencilIcon style={{ width: rem(14), height: rem(14) }} />
                    </ActionIcon>
                )
            }
            {
                !hideDeleteBtn && (
                    <ActionIcon variant="subtle" color="red" onClick={onConfirmBtnClick}>
                        <TrashIcon style={{ width: rem(14), height: rem(14) }} />
                    </ActionIcon>
                )
            }
        </Group>
    )
}