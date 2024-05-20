import { Badge, Table, Text } from "@mantine/core"
import ArticleFamiliesActions from "./ArticleFamiliesActions"
import { ACTIONS_COLUMN_WIDTH } from "../../../utils/constants"
import Article from "../../../types/Article"

interface Props {
    article: Article
    onUpdateArticle: () => void
    onDeleteArticle: () => void
}

export default function ArticleTRow({ article, onUpdateArticle, onDeleteArticle }: Props) {
    return (
        <Table.Tr>
            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={article.name}>
                    {article.name}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={`${article.transportFee}`}>
                    {article.transportFee}
                </Text>
            </Table.Td>

            <Table.Td>
                {
                    article.articleFamily
                        ? <Badge variant="light" style={{ textTransform: 'initial', maxWidth: "100%" }} title={article.articleFamily.name}>{article.articleFamily.name}</Badge>
                        : <Text fz="xl">-</Text>
                }
            </Table.Td>
            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <ArticleFamiliesActions
                    selectedArticle={article}
                    onUpdateArticle={onUpdateArticle}
                    onDeleteArticle={onDeleteArticle}
                />
            </Table.Td>
        </Table.Tr>
    )
}