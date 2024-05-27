import { Group, Text } from "@mantine/core";
import Source from "../../../types/Source";

interface Props {
  source: Source
}

export default function SourceSelectOption({ source }: Props) {
  return (
    <Group
      wrap='nowrap' title={source.name}>
      <Text fz="xs" fw={400} truncate='end'>
        {source.name}
      </Text>
    </Group>
  );
}