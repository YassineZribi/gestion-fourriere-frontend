import { Group, Text } from "@mantine/core";
import SubRegister from "../../../types/SubRegister";

interface Props {
  subRegister: SubRegister
}

export default function SubRegisterSelectOption({ subRegister }: Props) {
  return (
    <Group
      wrap='nowrap' title={subRegister.name}>
      <Text fz="xs" fw={400} truncate='end'>
        {subRegister.name}
      </Text>
    </Group>
  );
}