import { Center, Table, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import Source from "../../../types/Source";

interface Props {
  source: Source
}

export default function SourceDetails({ source }: Props) {
  const { t: tGlossary } = useTranslation("glossary")
  
  return (
    <Center>
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>{tGlossary("source.name")}</Table.Th>
            <Table.Td>{source.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("source.description")}</Table.Th>
            <Table.Td>{source.description ? <Text style={{ whiteSpace: 'pre-wrap' }}>{source.description}</Text> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Center>
  )
}