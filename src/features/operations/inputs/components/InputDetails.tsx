import { AtSymbolIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Avatar, Center, Group, Text, rem } from "@mantine/core";
import { getFullResourcePath } from "../../../../lib/axios/api";
import Input from "../../../../types/Input";

interface Props {
    input: Input
}

export default function InputDetails({input}: Props) {
    
    return (
        <Center>
          Input Details
        {/* <Group wrap="nowrap">
          <Avatar
            src={user?.photoPath ? getFullResourcePath(user.photoPath) : ""}
            size={94}
            style={{border: "2px solid"}}
            radius="md"
          />
          <div>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {user.role.name.toUpperCase()}
            </Text>
  
            <Text fz="lg" fw={500} className={classes.name}>
              {user.firstName} {user.lastName}
            </Text>
  
            <Group wrap="nowrap" gap={10} mt={3}>
              <AtSymbolIcon style={{ width: rem(16), height: rem(16) }} className={classes.icon} />
              <Text fz="xs" c="dimmed">
                {user.email.toLowerCase()}
              </Text>
            </Group>
  
            <Group wrap="nowrap" gap={10} mt={5}>
              <PhoneIcon style={{ width: rem(16), height: rem(16) }} className={classes.icon} />
              <Text fz="xs" c="dimmed">
                {getCountryCallingCode(user.phoneNumber)} {getNationalNumber(user.phoneNumber)}
              </Text>
            </Group>
          </div>
        </Group> */}
      </Center>
    )
}