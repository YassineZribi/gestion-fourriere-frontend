import { Box, Center, Loader, useMantineTheme, useComputedColorScheme, Space, Text, Stack, Avatar } from "@mantine/core";
import { Tree, TreeNode } from 'react-organizational-chart';
import useFetchChiefExecutiveWithSubordinates from "../hooks/useFetchChiefExecutiveWithSubordinates";
import EmployeeWithSubrdinates from "../types/EmployeeWithSubordinates";
import { getFullResourcePath } from "../../../lib/axios/api";

export default function InstitutionChart() {
    const { chiefExecutive, isFetching, error } = useFetchChiefExecutiveWithSubordinates()

    return (
        <Box maw={600} mx="auto">
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {isFetching && <Center mt={"xl"}><Loader size={50} /></Center>}
            {chiefExecutive && <Box dir="ltr"><OrganizationalChart data={chiefExecutive} /></Box>}
        </Box>
    )
}

interface OrganizationalChartProps {
    data: EmployeeWithSubrdinates
}

function OrganizationalChart({ data }: OrganizationalChartProps) {
    const theme = useMantineTheme();
    const colorScheme = useComputedColorScheme()
    const color = colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[9];
    console.log({ colorScheme });

    return (
        <Tree label={<Label employee={data} />} lineWidth={'2px'} lineColor={color} lineBorderRadius={'10px'}>
            {
                data.subordinates.map(subordinate => <EmployeeNode key={subordinate.id} employee={subordinate} />)
            }
        </Tree>
    )
}

interface EmployeeNodeProps {
    employee: EmployeeWithSubrdinates
}

const EmployeeNode = ({ employee }: EmployeeNodeProps) => (
    <TreeNode label={<Label employee={employee} />}>
        {employee.subordinates && employee.subordinates.map(subordinate => (
            <EmployeeNode key={subordinate.id} employee={subordinate} />
        ))}
    </TreeNode>
);

interface LabelProps {
    employee: EmployeeWithSubrdinates
}

function Label({ employee }: LabelProps) {
    return (
        <Stack
            style={{
                padding: '5px',
                borderRadius: '8px',
                display: 'inline-flex',
                borderWidth: 1,
                borderStyle: 'solid',
                // borderColor: theme.primaryColor[5]
            }}
            align="center"
            gap="sm"
        >
            <Avatar
                src={employee?.photoPath ? getFullResourcePath(employee.photoPath) : ""}
                size={50}
            // style={{ border: "2px solid" }}
            // radius="md"
            />
            <Stack gap="2px">
                <Text fz="sm" fw={500}>
                    {employee.firstName} {employee.lastName}
                </Text>
                <Text fz="xs" opacity={0.6}>
                    {employee.position}
                </Text>
            </Stack>
        </Stack>
    )
}