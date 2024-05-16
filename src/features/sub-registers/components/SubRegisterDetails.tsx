import { Badge, Center, Table, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import SubRegister from "../../../types/SubRegister";

interface Props {
  subRegister: SubRegister
}

export default function SubRegisterDetails({ subRegister }: Props) {
  const { t: tGlossary } = useTranslation("glossary")
  
  return (
    <Center>
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>{tGlossary("subRegister.name")}</Table.Th>
            <Table.Td>{subRegister.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("subRegister.description")}</Table.Th>
            <Table.Td>{subRegister.description ? <Text style={{ whiteSpace: 'pre-wrap' }}>{subRegister.description}</Text> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("subRegister.register")}</Table.Th>
            <Table.Td>{subRegister.register ? <Badge variant="light" style={{textTransform: 'initial'}}>{subRegister.register.name}</Badge> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Center>
  )
}