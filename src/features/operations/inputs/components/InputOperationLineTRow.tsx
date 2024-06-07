import { useTranslation } from "react-i18next"
import UpsertInputOperationLineModal, { InputOperationLineDto } from "./UpsertInputOperationLineModal"
import useModal from "../../../../hooks/useModal"
import { ActionIcon, Avatar, Box, Flex, Group, Table, Text } from "@mantine/core"
import { getFullResourcePath } from "../../../../lib/axios/api"
import { PencilIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline"
import Sup from "../../../../components/Sup"
import ConfirmationModal from "../../../../components/ConfirmationModal"
import { columnsWidth } from "./helpers"

interface Props {
    inputOperationLine: InputOperationLineDto
    onDeleteInputOperationLine: () => void
    onUpdateInputOperationLine: (inputOperationLineDto: InputOperationLineDto) => void
}

export default function InputOperationLineTRow({ inputOperationLine: line, onDeleteInputOperationLine, onUpdateInputOperationLine }: Props) {
    const { t: tGlossary } = useTranslation("glossary")
    const { t } = useTranslation()

    const [isOperationLineSelectionModalOpen, { open: openOperationLineSelectionModal, close: closeOperationLineSelectionModal }] = useModal()

    const [isConfirmationModalOpen, { open: openConfirmationModal, close: closeConfirmationModal }] = useModal()

    return (
        <>
            <Table.Tr>
                <Table.Td style={{ width: columnsWidth.article }}>
                    <Box style={{ flex: 1 }}>
                        <Group
                            wrap='nowrap' title={`${line.article.name}`}>
                            <Avatar
                                styles={{ root: { width: 36, height: 36, minWidth: 36 } }}
                                // style={{ border: "1px solid" }}
                                src={line.article.photoPath ? getFullResourcePath(line.article.photoPath) : ""}
                                radius={"sm"}
                            ><PhotoIcon style={{ width: "80%" }} /></Avatar>
                            <Group gap={"5px"} wrap='nowrap' className='text-truncate'>
                                <Text fz="xs" fw={700} truncate="end">
                                    {line.article.name}
                                </Text>
                            </Group>
                        </Group>
                    </Box>
                </Table.Td>
                <Table.Td style={{ width: columnsWidth.description }}>
                    <Flex h={36} align="center">
                        <Text fz="sm" fw={500} truncate="end" title={line.description}>
                            {line.description}
                        </Text>
                    </Flex>
                </Table.Td>
                <Table.Td>
                    <Flex h={36} align="center" justify="center">
                        <Text>{line.nightlyAmount}{' '}<Sup>{tGlossary(`currency.tn`)}</Sup></Text>
                    </Flex>
                </Table.Td>
                <Table.Td>
                    <Flex h={36} align="center" justify="center">
                        <Text>{line.quantity}</Text>
                    </Flex>
                </Table.Td>
                <Table.Td>
                    <Flex h={36} align="center" justify="center">
                        <Text>{line.nightlyAmount * line.quantity}{' '}<Sup>{tGlossary(`currency.tn`)}</Sup></Text>
                    </Flex>
                </Table.Td>
                <Table.Td>
                    <Flex h={36} align="center" justify="center">
                        <Text>{line.transportFee}{' '}<Sup>{tGlossary(`currency.tn`)}</Sup></Text>
                    </Flex>
                </Table.Td>
                <Table.Td style={{ width: 100 }}>
                    <ActionIcon variant="subtle" color="gray" size="input-sm" onClick={openOperationLineSelectionModal}>
                        <PencilIcon width="1rem" height="1rem" />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red" size="input-sm" onClick={openConfirmationModal}>
                        <TrashIcon width="1rem" height="1rem" />
                    </ActionIcon>
                </Table.Td>
            </Table.Tr>

            <UpsertInputOperationLineModal
                title={t("components.upsertInputOperationLineModal.title.onUpdate")}
                isOpened={isOperationLineSelectionModalOpen}
                selectedInputOperationLine={line}
                onClose={closeOperationLineSelectionModal}
                onSubmit={(inputOperationLineDto) => {
                    console.log(inputOperationLineDto);
                    if (inputOperationLineDto.article) {
                        onUpdateInputOperationLine(inputOperationLineDto)
                    }
                }}
            />

            <ConfirmationModal
                isLoading={false}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={() => {
                    onDeleteInputOperationLine()
                    closeConfirmationModal()
                }}
            >
                <Text size="md" fw={"bold"}>
                    {t("components.inputOperationLineTRow.confirmationModal.message")}
                </Text>
            </ConfirmationModal>
        </>
    )
}