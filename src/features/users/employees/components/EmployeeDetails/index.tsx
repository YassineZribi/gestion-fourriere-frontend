import { AtSymbolIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Avatar, Center, Group, Text, rem } from "@mantine/core";
import classes from './index.module.css';
import Employee from "../../../../../types/Employee";
import { getCountryCallingCode, getNationalNumber } from "../../../../../lib/libphonenumber-js";
import { getFullResourcePath } from "../../../../../lib/axios/api";

interface Props {
    employee: Employee
}

export default function EmployeeDetails({employee}: Props) {
    
    return (
        <Center>
        <Group wrap="nowrap">
          <Avatar
            src={employee?.photoPath ? getFullResourcePath(employee.photoPath) : ""}
            size={94}
            style={{border: "2px solid"}}
            radius="md"
          />
          <div>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {employee.role.name.toUpperCase()}
            </Text>
  
            <Text fz="lg" fw={500} className={classes.name}>
              {employee.firstName} {employee.lastName}
            </Text>
  
            <Group wrap="nowrap" gap={10} mt={3}>
              <AtSymbolIcon style={{ width: rem(16), height: rem(16) }} className={classes.icon} />
              <Text fz="xs" c="dimmed">
                {employee.email.toLowerCase()}
              </Text>
            </Group>
  
            <Group wrap="nowrap" gap={10} mt={5}>
              <PhoneIcon style={{ width: rem(16), height: rem(16) }} className={classes.icon} />
              <Text fz="xs" c="dimmed">
                {getCountryCallingCode(employee.phoneNumber)} {getNationalNumber(employee.phoneNumber)}
              </Text>
            </Group>
          </div>
        </Group>
      </Center>
    )
}