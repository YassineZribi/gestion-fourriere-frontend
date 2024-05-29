import { Badge, Flex, Image, Table, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import Article from "../../../types/Article";
import { getFullResourcePath } from "../../../lib/axios/api";
import Sup from "../../../components/Sup";

interface Props {
  article: Article
}

export default function ArticleDetails({ article }: Props) {
  const { t: tGlossary } = useTranslation("glossary")

  return (
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>{tGlossary("article.name")}</Table.Th>
            <Table.Td>{article.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("article.transportFee")}</Table.Th>
            <Table.Td>{article.transportFee} <Sup>{tGlossary(`currency.tn`)}</Sup></Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>{tGlossary("article.articleFamily")}</Table.Th>
            <Table.Td>{article.articleFamily ? <Badge variant="light" style={{ textTransform: 'initial' }}>{article.articleFamily.name}</Badge> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th style={{verticalAlign: article.photoPath ? 'top' : 'inherit'}}>{tGlossary("article.photo")}</Table.Th>
            <Table.Td>{article.photoPath ? <Image src={getFullResourcePath(article.photoPath)} maw={150} w={'100%'} mx={"auto"} display={"inline-block"} radius={4} /> : <Text fz="xl">-</Text>}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
  )
}