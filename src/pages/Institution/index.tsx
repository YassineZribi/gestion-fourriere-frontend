import { Tabs } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import InstitionInformation from '../../features/institution/components/InstitutionInformation';
import Employees from '../../features/employees/components/Employees';
import OrganizationalChart from '../../features/employees/components/OrganizationalChart';

const schema = z.enum(["information", "employees", "chart"])
const { information, employees, chart } = schema.Values

export default function Institution() {
    const navigate = useNavigate();
    const { tab: currentTab } = useParams();

    const value = schema.safeParse(currentTab).success ? currentTab : information

    const handleChangeTab = (newValue: string | null) => {
        navigate(`/institution/${newValue ?? information}`)
    }

    return (
        <Tabs variant="outline" value={value} onChange={handleChangeTab}>
            <Tabs.List>
                <Tabs.Tab value={information}>
                    Information
                </Tabs.Tab>
                <Tabs.Tab value={employees}>
                    Employees
                </Tabs.Tab>
                <Tabs.Tab value={chart}>
                    Organizational chart
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={information}>
                <InstitionInformation />
            </Tabs.Panel>

            <Tabs.Panel value={employees}>
                <Employees />
            </Tabs.Panel>

            <Tabs.Panel value={chart}>
                <OrganizationalChart />
            </Tabs.Panel>

        </Tabs>
    );
}