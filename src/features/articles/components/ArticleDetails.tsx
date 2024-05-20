import { Badge, Flex, Image, Table, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import Article from "../../../types/Article";
import { getFullResourcePath } from "../../../lib/axios/api";

interface Props {
  article: Article
}

export default function ArticleDetails({ article }: Props) {
  const { t: tGlossary } = useTranslation("glossary")

  return (
    <Flex direction={"column"} justify={"center"}>
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>{tGlossary("article.name")}</Table.Th>
            <Table.Td>{article.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("article.transportFee")}</Table.Th>
            <Table.Td>{article.transportFee}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("article.articleFamily")}</Table.Th>
            <Table.Td>{article.articleFamily ? <Badge variant="light" style={{ textTransform: 'initial' }}>{article.articleFamily.name}</Badge> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("article.photo")}</Table.Th>
            <Table.Td>{!article.photoPath && <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      {
        article.photoPath && <Image src={getFullResourcePath(article.photoPath)} maw={"100%"} w={'fit-content'} mx={"auto"} display={"inline-block"} radius={4} />
      }
    </Flex>
  )
}