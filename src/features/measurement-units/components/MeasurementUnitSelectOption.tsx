import { Group, Text } from "@mantine/core";
import MeasurementUnit from "../../../types/MeasurementUnit";

interface Props {
  measurementUnit: MeasurementUnit
}

export default function MeasurementUnitSelectOption({ measurementUnit: { name, symbol } }: Props) {
  return (
    <Group gap={"5px"} wrap='nowrap' className='text-truncate' title={`${name} (${symbol})`}>
      <Text fz="xs" fw={400}>
        {name}
      </Text>
      <Text fz="xs" opacity={0.6} className='text-truncate'>
        ({symbol})
      </Text>
    </Group>
  );
}