import { Avatar, Group, Text } from "@mantine/core";
import { getFullResourcePath } from "../../../lib/axios/api";
import Employee from "../../../types/Employee";

interface Props {
    employee: Employee
}

export default function EmployeeSelectOption({employee: { firstName, lastName, photoPath, position }}: Props) {
    return (
      <Group
       wrap='nowrap' title={`${firstName} ${lastName} (${position})`}>
        <Avatar
          styles={{root: {width: 22, height: 22, minWidth: 22}}}
          // style={{ border: "1px solid" }}
          src={photoPath ? getFullResourcePath(photoPath) : ""}
        />
        <Group gap={"5px"} wrap='nowrap' className='text-truncate'>
          <Text fz="xs" fw={400}>
            {firstName} {lastName}
          </Text>
          <Text fz="xs" opacity={0.6} className='text-truncate'>
            ({position})
          </Text>
        </Group>
      </Group>
    );
  }