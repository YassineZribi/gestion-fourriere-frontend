import { Badge, Center, Table } from "@mantine/core";
import { useTranslation } from "react-i18next";
import MeasurementUnit from "../../../types/MeasurementUnit";

interface Props {
  measurementUnit: MeasurementUnit
}

export default function MeasurementUnitDetails({ measurementUnit }: Props) {
  const { t: tGlossary } = useTranslation("glossary")
  
  return (
    <Center>
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>{tGlossary("measurementUnit.name")}</Table.Th>
            <Table.Td>{measurementUnit.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("measurementUnit.symbol")}</Table.Th>
            <Table.Td><Badge style={{ textTransform: 'initial', maxWidth: "100%" }} title={measurementUnit.symbol}>{measurementUnit.symbol}</Badge></Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Center>
  )
}