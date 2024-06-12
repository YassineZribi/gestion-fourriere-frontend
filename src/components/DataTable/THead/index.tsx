import { ActionIcon, Group, Table, rem } from "@mantine/core";
import Th from "../Th";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { ACTIONS_COLUMN_WIDTH } from "../../../utils/constants";
import { CSSProperties } from "react";

type SimpleTh = {
    style?: React.CSSProperties
    label: string
}

type SortedTh = SimpleTh & {
    name: string
}

export type Th = SimpleTh | SortedTh

function isSortedTh(item: Th): item is SortedTh {
    return (item as SortedTh).name !== undefined;
}

interface Props {
    columns: Th[]
    sortList: string[]
    showFilters: boolean
    actionsColumnWidth?: CSSProperties['width'],
    onSort: (name: string) => void
    onToggleFilters: () => void
}

export default function THead({ columns, sortList, showFilters, actionsColumnWidth = ACTIONS_COLUMN_WIDTH, onSort, onToggleFilters }: Props) {

    return (
        <Table.Thead>
            <Table.Tr>
                {
                    columns.map((th, index) => (
                        isSortedTh(th)
                            ? (
                                <Th
                                    key={index}
                                    sortList={sortList}
                                    name={th.name}
                                    onSort={onSort}
                                    style={th.style}
                                >
                                    {th.label}
                                </Th>
                            )
                            : (
                                <Table.Th
                                    key={index}
                                    style={th.style}
                                >
                                    {th.label}
                                </Table.Th>
                            )
                    ))
                }
                <Table.Th style={{ width: actionsColumnWidth, paddingBottom: 0, paddingTop: 0 }}>
                    <Group gap={0} justify="flex-end">
                        <ActionIcon variant={showFilters ? "light" : "subtle"} color="gray" onClick={onToggleFilters}>
                            <FunnelIcon style={{ width: rem(14), height: rem(14) }} />
                        </ActionIcon>
                    </Group>
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
    )
}