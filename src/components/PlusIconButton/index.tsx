import { PlusIcon } from "@heroicons/react/24/outline";
import { ActionIconProps, PolymorphicComponentProps, rem } from "@mantine/core";
import IconButton from "../IconButton";

export default function PlusIconButton(props: PolymorphicComponentProps<"button", ActionIconProps>) {
    return (
        <IconButton {...props}>
            <PlusIcon style={{ width: rem(14), height: rem(14) }} />
        </IconButton>
    )
}