import { ActionIcon, ActionIconProps, PolymorphicComponentProps, rem } from "@mantine/core";

export default function IconButton({children, ...rest}: PolymorphicComponentProps<"button", ActionIconProps>) {
    return (
        <ActionIcon variant="default" pos={"relative"} top={24.8} size="input-sm" {...rest}>
            {children}
        </ActionIcon>
    )
}