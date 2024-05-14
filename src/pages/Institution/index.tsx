import { Tabs } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import InstitutionProfile from '../../features/institution/components/InstitutionProfile';
import InstitutionEmployees from '../../features/employees/components/InstitutionEmployees';
import InstitutionChart from '../../features/employees/components/InstitutionChart';
import { useTranslation } from 'react-i18next';

const schema = z.enum(["profile", "employees", "chart"])
const { profile, employees, chart } = schema.Values

export default function Institution() {
    const navigate = useNavigate();
    const { tab: currentTab } = useParams();
    const {t} = useTranslation('root')

    const value = schema.safeParse(currentTab).success ? currentTab : profile

    const handleChangeTab = (newValue: string | null) => {
        navigate(`/institution/${newValue ?? profile}`)
    }

    return (
        <Tabs keepMounted={false} variant="outline" value={value} onChange={handleChangeTab}>
            <Tabs.List>
                <Tabs.Tab value={profile}>
                    {t('institution.tabs.profile')}
                </Tabs.Tab>
                <Tabs.Tab value={employees}>
                {t('institution.tabs.employees')}
                </Tabs.Tab>
                <Tabs.Tab value={chart}>
                {t('institution.tabs.chart')}
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={profile}>
                <InstitutionProfile />
            </Tabs.Panel>

            <Tabs.Panel value={employees}>
                <InstitutionEmployees />
            </Tabs.Panel>

            <Tabs.Panel value={chart}>
                <InstitutionChart />
            </Tabs.Panel>

        </Tabs>
    );
}