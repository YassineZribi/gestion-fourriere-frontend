import { Group, Text } from "@mantine/core";
import Register from "../../../types/Register";

interface Props {
  register: Register
}

export default function RegisterSelectOption({ register }: Props) {
  return (
    <Group
      wrap='nowrap' title={register.name}>
      <Text fz="xs" fw={400} truncate='end'>
        {register.name}
      </Text>
    </Group>
  );
}