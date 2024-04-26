import { ArrowsPointingOutIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Group, rem } from "@mantine/core";

interface Props {
    onShowDetailsBtnClick: () => void;
    onUpdateBtnClick: () => void;
    onConfirmBtnClick: () => void;
}

export default function TRowActions({onShowDetailsBtnClick, onUpdateBtnClick, onConfirmBtnClick}: Props) {
    return (
        <Group gap={0} justify="flex-end">
            <ActionIcon variant="subtle" color="blue" onClick={onShowDetailsBtnClick}>
                <ArrowsPointingOutIcon style={{ width: rem(14), height: rem(14) }} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray" onClick={onUpdateBtnClick}>
                <PencilIcon style={{ width: rem(14), height: rem(14) }} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red" onClick={onConfirmBtnClick}>
                <TrashIcon style={{ width: rem(14), height: rem(14) }} />
            </ActionIcon>
        </Group>
    )
}