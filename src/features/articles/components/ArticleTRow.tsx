import { Badge, Checkbox, Table, Text } from "@mantine/core"
import ArticlesActions from "./ArticlesActions"
import { ACTIONS_COLUMN_WIDTH, LINE_SELECTION_COLUMN_WIDTH } from "../../../utils/constants"
import Article from "../../../types/Article"

interface Props {
    article: Article
    isSelected?: boolean
    hideUpdateBtn?: boolean
    hideDeleteBtn?: boolean
    onSelect?: (article: Article | null) => void
    onUpdateArticle: () => void
    onDeleteArticle: () => void
}

export default function ArticleTRow({ article, isSelected, hideDeleteBtn, hideUpdateBtn, onSelect, onUpdateArticle, onDeleteArticle }: Props) {
    return (
        <Table.Tr
            bg={isSelected ? 'var(--mantine-color-blue-light)' : undefined}
        >
            {
                onSelect && (
                    <Table.Td style={{ width: LINE_SELECTION_COLUMN_WIDTH }}>
                        <Checkbox
                            aria-label="Select article"
                            checked={isSelected}
                            onChange={(event) => onSelect(event.currentTarget.checked ? article : null)}
                        />
                    </Table.Td>
                )
            }
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
                <ArticlesActions
                    selectedArticle={article}
                    hideUpdateBtn={hideUpdateBtn}
                    hideDeleteBtn={hideDeleteBtn}
                    onUpdateArticle={onUpdateArticle}
                    onDeleteArticle={onDeleteArticle}
                />
            </Table.Td>
        </Table.Tr>
    )
}