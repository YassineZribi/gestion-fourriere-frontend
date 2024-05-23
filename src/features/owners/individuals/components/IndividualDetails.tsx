import { Center, Table, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import Individual from "../../../../types/Individual";

interface Props {
  individual: Individual
}

export default function CompanyDetails({ individual }: Props) {
  const { t: tGlossary } = useTranslation("glossary")
  
  return (
    <Center>
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>{tGlossary("individual.firstName")}</Table.Th>
            <Table.Td>{individual.firstName}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("individual.lastName")}</Table.Th>
            <Table.Td>{individual.lastName}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("individual.nationalId")}</Table.Th>
            <Table.Td>{individual.nationalId}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("individual.phoneNumber")}</Table.Th>
            <Table.Td>{individual.phoneNumber}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("individual.email")}</Table.Th>
            <Table.Td>{individual.email}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("individual.address")}</Table.Th>
            <Table.Td>{individual.address ? <Text style={{ whiteSpace: 'pre-wrap' }}>{individual.address}</Text> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Center>
  )
}