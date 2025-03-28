import { Avatar, Badge, Table, Text, rem } from "@mantine/core"
import ArticleFamiliesActions from "./ArticleFamiliesActions"
import { ACTIONS_COLUMN_WIDTH, AVATAR_COLUMN_WIDTH } from "../../../utils/constants"
import ArticleFamily from "../../../types/ArticleFamily"
import { useTranslation } from "react-i18next"
import { getFullResourcePath } from "../../../lib/axios/api"
import { PhotoIcon } from "@heroicons/react/24/outline"
import Sup from "../../../components/Sup"

interface Props {
    articleFamily: ArticleFamily
    onUpdateArticleFamily: () => void
    onDeleteArticleFamily: () => void
}

export default function ArticleFamilyTRow({ articleFamily, onUpdateArticleFamily, onDeleteArticleFamily }: Props) {
    const { t: tGlossary } = useTranslation("glossary")

    return (
        <Table.Tr>
            <Table.Td style={{ width: AVATAR_COLUMN_WIDTH }}>
                <Avatar
                    size={30}
                    src={articleFamily.photoPath ? getFullResourcePath(articleFamily.photoPath) : ""}
                    radius={"sm"}
                ><PhotoIcon style={{ width: rem(25) }} /></Avatar>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={articleFamily.name}>
                    {articleFamily.name}
                </Text>
            </Table.Td>

            {/* <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={articleFamily.description || ''}>
                    {articleFamily.description}
                </Text>
            </Table.Td> */}

            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={`${articleFamily.nightlyAmount}`}>
                    {articleFamily.nightlyAmount} <Sup>{tGlossary(`currency.tn`)}</Sup>
                </Text>
            </Table.Td>

            <Table.Td>
                <Badge color={articleFamily.unitCalculation ? "pink" : "teal"} variant="light" style={{ textTransform: 'initial', maxWidth: "100%" }}>{tGlossary(articleFamily.unitCalculation ? "calculationMethods.perUnit" : "calculationMethods.perBatch")}</Badge>
            </Table.Td>

            <Table.Td>
                {
                    articleFamily.register
                        ? <Badge variant="light" style={{ textTransform: 'initial', maxWidth: "100%" }} title={articleFamily.register.name}>{articleFamily.register.name}</Badge>
                        : <Text fz="xl">-</Text>
                }
            </Table.Td>

            <Table.Td>
                {
                    articleFamily.measurementUnit
                        ? <Badge color="violet" variant="light" style={{ textTransform: 'initial', maxWidth: "100%" }}>{articleFamily.measurementUnit.name} ({articleFamily.measurementUnit.symbol})</Badge>
                        : <Text fz="xl">-</Text>
                }
            </Table.Td>
            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <ArticleFamiliesActions
                    selectedArticleFamily={articleFamily}
                    onUpdateArticleFamily={onUpdateArticleFamily}
                    onDeleteArticleFamily={onDeleteArticleFamily}
                />
            </Table.Td>
        </Table.Tr>
    )
}