
import { Group, Radio, Space } from '@mantine/core';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import IndividualsManagement from './IndividualsManagement';
import CompaniesManagement from './CompaniesManagement';

export const ownerTabs = ["individuals", "companies"] as const
const schema = z.enum(ownerTabs)
export type OwnerSchemaType = z.infer<typeof schema>
export const { individuals, companies } = schema.Values

export default function OwnersManagement() {
    const navigate = useNavigate();
    const { tab: currentTab } = useParams();

    const value = schema.safeParse(currentTab).success ? currentTab : individuals

    const handleChangeTab = (newValue: string) => {
        navigate({
            pathname: `/owners-management/${newValue}`,
            search: '' // clear search params
        })
    }

    const { t: tRoot } = useTranslation("root")
    const { t: tGlossary } = useTranslation("glossary")

    return (
        <div>
            <Title>{tRoot("ownersManagement.title")}</Title>
            <Space my={'xl'} />
            <Radio.Group
                value={value}
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
            {value === companies && <CompaniesManagement />}
            {value === individuals && <IndividualsManagement />}
        </div>
    );
}