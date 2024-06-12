import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Accordion, rem } from "@mantine/core";
import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    children: ReactNode
    showFilters: boolean
    onToggleFilters: () => void
}

const FILTERS_ACCORDION_ITEM = "filters"

export default function AdvancedFiltersCollapse({ children, showFilters, onToggleFilters }: Props) {
    const { t } = useTranslation()

    const accordionValue = useMemo(() => showFilters ? FILTERS_ACCORDION_ITEM : null, [showFilters])

    return (
        <Accordion value={accordionValue} variant="default" onChange={onToggleFilters}>
            <Accordion.Item value={FILTERS_ACCORDION_ITEM}>
                <Accordion.Control
                    icon={
                        <AdjustmentsHorizontalIcon
                            style={{ width: rem(18), height: rem(18) }}
                        />
                    }
                >
                    {t("labels.advancedFilters")}
                </Accordion.Control>
                <Accordion.Panel>
                    {children}
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}