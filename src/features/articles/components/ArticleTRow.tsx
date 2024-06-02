import { Avatar, Badge, Checkbox, Table, Text, rem } from "@mantine/core"
import ArticlesActions from "./ArticlesActions"
import { ACTIONS_COLUMN_WIDTH, AVATAR_COLUMN_WIDTH, LINE_SELECTION_COLUMN_WIDTH } from "../../../utils/constants"
import Article from "../../../types/Article"
import { getFullResourcePath } from "../../../lib/axios/api"
import { PhotoIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import Sup from "../../../components/Sup"

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
    const { t: tGlossary } = useTranslation("glossary")

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
            <Table.Td style={{ width: AVATAR_COLUMN_WIDTH }}>
                <Avatar
                    size={30}
                    src={article.photoPath ? getFullResourcePath(article.photoPath) : ""}
                    radius={"sm"}
                ><PhotoIcon style={{ width: "80%" }} /></Avatar>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={article.name}>
                    {article.name}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={`${article.transportFee}`}>
                    {article.transportFee} <Sup>{tGlossary(`currency.tn`)}</Sup>
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