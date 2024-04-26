import { XMarkIcon } from "@heroicons/react/24/outline"
import { ActionIcon, rem } from "@mantine/core"

interface Props {
    onClick: () => void
}

export default function ClearFiltersButton({ onClick }: Props) {
    return (
        <ActionIcon variant="subtle" color="gray" onClick={onClick}>
            <XMarkIcon style={{ width: rem(14), height: rem(14) }} />
        </ActionIcon>
    )
}