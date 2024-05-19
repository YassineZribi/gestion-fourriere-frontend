import { Badge, Flex, Image, Table, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import ArticleFamily from "../../../types/ArticleFamily";
import { getFullResourcePath } from "../../../lib/axios/api";

interface Props {
  articleFamily: ArticleFamily
}

export default function ArticleFamilyDetails({ articleFamily }: Props) {
  const { t: tGlossary } = useTranslation("glossary")

  return (
    <Flex direction={"column"} justify={"center"}>
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>{tGlossary("articleFamily.name")}</Table.Th>
            <Table.Td>{articleFamily.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("articleFamily.description")}</Table.Th>
            <Table.Td>{articleFamily.description ? <Text style={{ whiteSpace: 'pre-wrap' }}>{articleFamily.description}</Text> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("articleFamily.nightlyAmount")}</Table.Th>
            <Table.Td>{articleFamily.nightlyAmount} TND</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("articleFamily.calculationMethod")}</Table.Th>
            <Table.Td><Badge color={articleFamily.unitCalculation ? "pink" : "teal"} variant="light" style={{ textTransform: 'initial' }}>{tGlossary(articleFamily.unitCalculation ? "calculationMethods.perUnit" : "calculationMethods.perBatch")}</Badge></Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("articleFamily.register")}</Table.Th>
            <Table.Td>{articleFamily.register ? <Badge variant="light" style={{ textTransform: 'initial' }}>{articleFamily.register.name}</Badge> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("articleFamily.measurementUnit")}</Table.Th>
            <Table.Td>{articleFamily.measurementUnit ? <Badge color="violet" variant="light" style={{ textTransform: 'initial' }}>{articleFamily.measurementUnit.name} ({articleFamily.measurementUnit.symbol})</Badge> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("articleFamily.photo")}</Table.Th>
            <Table.Td>{!articleFamily.photoPath && <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      {
        articleFamily.photoPath && <Image src={getFullResourcePath(articleFamily.photoPath)} maw={"100%"} w={'fit-content'} mx={"auto"} display={"inline-block"} radius={4} />
      }
    </Flex>
  )
}