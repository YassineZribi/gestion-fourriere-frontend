import { Group, Table } from "@mantine/core";
import ClearableInput from "../../../components/ClearableInput";
import ClearFiltersButton from "../../../components/DataTable/ClearFiltersButton";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../components/SearchableCombobox";
import articleFamiliessService from '../../article-families/services'
import ArticleFamily from "../../../types/ArticleFamily";
import ArticleFamilySelectOption from "../../article-families/components/ArticleFamilySelectOption";
import { LINE_SELECTION_COLUMN_WIDTH } from "../../../utils/constants";

interface Props {
    selectedArticleFamily: ArticleFamily | null
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    withSelectionColumn?: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function ArticlesFilterTRow({ selectedArticleFamily, filters, hasFilters, withSelectionColumn = false, onFilter, onClearFilters }: Props) {
    const { t } = useTranslation()

    return (
        <Table.Tr>
            {withSelectionColumn && (
                <Table.Td style={{ width: LINE_SELECTION_COLUMN_WIDTH }}></Table.Td>
            )}
            <Table.Td></Table.Td>
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("name", newValue)}
                    defaultValue={filters["name"]}
                />
            </Table.Td>
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("transportFee", newValue)}
                    defaultValue={filters["transportFee"]}
                    type="number"
                />
            </Table.Td>
            <Table.Td>
                <SearchableCombobox
                    selectedEntity={selectedArticleFamily}
                    placeholder={t("labels.noFilter")}
                    variant="filled"
                    onFetch={articleFamiliessService.getAllArticleFamiliesByName}
                    onSelectOption={newArticleFamily => {
                        if (newArticleFamily?.id)
                            onFilter("articleFamilyId", newArticleFamily.id.toString())
                    }}
                    onClear={() => {
                        onFilter("articleFamilyId", "")
                    }}
                    shouldClearOption={!filters["articleFamilyId"]}
                >
                    {
                        (articleFamily) => <ArticleFamilySelectOption articleFamily={articleFamily} />
                    }
                </SearchableCombobox>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    {
                        hasFilters && (
                            <ClearFiltersButton
                                onClick={onClearFilters}
                            />
                        )
                    }
                </Group>
            </Table.Td>
        </Table.Tr>
    )
}