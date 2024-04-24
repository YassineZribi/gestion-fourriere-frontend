import { Tabs } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import InstitionInformation from '../../features/institution/components/InstitutionInformation';

const schema = z.enum(["information", "employees", "chart"])
const { information, employees, chart } = schema.Values

export default function Institution() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentSearchParamTab = searchParams.get("tab")

    const value = schema.safeParse(currentSearchParamTab).success ? currentSearchParamTab : information

    const handleChangeTab = (newValue: string | null) => {
        setSearchParams({ tab: newValue ?? information })
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
                Employees tab content
            </Tabs.Panel>

            <Tabs.Panel value={chart}>
                Organizational chart tab content
            </Tabs.Panel>

        </Tabs>
    );
}