import { useState } from "react";
import { Anchor, Box, Button, Group, Modal, ModalBaseProps, Radio, Space } from "@mantine/core";
import { z } from 'zod';
import { useTranslation } from "react-i18next";
import Owner from "../../../../types/Owner";
import { ownerTabs, companies, individuals, OwnerSchemaType } from "../../../../pages/OwnersManagement";
import CompaniesSelectionManagement from "./CompaniesSelectionManagement";
import IndividualsSelectionManagement from "./IndividualsSelectionManagement";
import Company from "../../../../types/Company";
import Individual from "../../../../types/Individual";

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    observation: z.string(),
});

export type FormData = z.infer<typeof schema>

export type UpsertRegisterDto = FormData

interface Props {
    title: string
    size?: ModalBaseProps['size']
    isOpened: boolean
    onClose: () => void
    onSubmit: (selectedOwner: Owner | null) => void
}

export default function OwnerSelectionModal({ title, size = "100%", isOpened, onClose, onSubmit }: Props) {
    const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null)
    const [radioValue, setRadioValue] = useState<OwnerSchemaType>(individuals)
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const handleSelectOwner = (owner: Owner | null) => {
        setSelectedOwner(owner)
    }

    const handleClose = () => {
        setSelectedOwner(null)
        onClose()
    }

    const handleChangeTab = (newValue: string) => {
        setRadioValue(newValue as OwnerSchemaType)
    }

    const handleConfirm = () => {
        onSubmit(selectedOwner)
        handleClose()
    }

    return (
        <Modal title={title} size={size} opened={isOpened} onClose={handleClose} closeOnClickOutside={false}>
            <Radio.Group
                value={radioValue}
                onChange={handleChangeTab}
                name="owner"
                withAsterisk
            >
                <Group justify="center" gap={"xl"}>
                    {
                        ownerTabs.map(owner => <Radio key={owner} value={owner} label={tGlossary(`owners.${owner}`)} />)
                    }
                </Group>
            </Radio.Group>

            <Space my={'xl'} />

            <Box mih={460}>
                {radioValue === companies && <CompaniesSelectionManagement onSelect={handleSelectOwner} selectedCompany={selectedOwner as Company | null} />}
                {radioValue === individuals && <IndividualsSelectionManagement onSelect={handleSelectOwner} selectedIndividual={selectedOwner as Individual | null} />}
            </Box>



            <Group justify="space-between" mt="xl">
                <Anchor component="button" type="button" variant="gradient" onClick={handleClose} size="sm">
                    {t("buttons.cancel")}
                </Anchor>
                <Button type="submit" disabled={!selectedOwner} onClick={handleConfirm}>
                    {t("buttons.save")}
                </Button>
            </Group>
        </Modal>
    )
}