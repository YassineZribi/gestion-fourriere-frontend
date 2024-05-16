import { Center, Table, Text } from "@mantine/core";
import Register from "../../../types/Register";
import { useTranslation } from "react-i18next";

interface Props {
  register: Register
}

export default function RegisterDetails({ register }: Props) {
  const { t: tGlossary } = useTranslation("glossary")
  
  return (
    <Center>
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>{tGlossary("register.name")}</Table.Th>
            <Table.Td>{register.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("register.observation")}</Table.Th>
            <Table.Td>{register.observation ? <Text style={{ whiteSpace: 'pre-wrap' }}>{register.observation}</Text> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Center>
  )
}