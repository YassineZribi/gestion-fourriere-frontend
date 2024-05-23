import { Center, Table, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import Company from "../../../../types/Company";

interface Props {
  company: Company
}

export default function CompanyDetails({ company }: Props) {
  const { t: tGlossary } = useTranslation("glossary")
  
  return (
    <Center>
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>{tGlossary("company.name")}</Table.Th>
            <Table.Td>{company.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("company.taxId")}</Table.Th>
            <Table.Td>{company.taxId}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("company.phoneNumber")}</Table.Th>
            <Table.Td>{company.phoneNumber}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("company.email")}</Table.Th>
            <Table.Td>{company.email}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("company.address")}</Table.Th>
            <Table.Td>{company.address ? <Text style={{ whiteSpace: 'pre-wrap' }}>{company.address}</Text> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Center>
  )
}