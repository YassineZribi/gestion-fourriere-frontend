import { PlusIcon } from "@heroicons/react/24/outline";
import { ActionIcon, ActionIconProps, PolymorphicComponentProps, rem } from "@mantine/core";

export default function PlusIconButton(props: PolymorphicComponentProps<"button", ActionIconProps>) {
    return (
        <ActionIcon variant="default" pos={"relative"} top={24.8} size="input-sm" {...props}>
            <PlusIcon style={{ width: rem(14), height: rem(14) }} />
        </ActionIcon>
    )
}