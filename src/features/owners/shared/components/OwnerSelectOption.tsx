import { Group, Text } from "@mantine/core";
import Owner from "../../../../types/Owner";
import { isCompany, isIndividual } from "../utils/helpers";

interface Props {
  owner: Owner
}

export default function OwnerSelectOption({ owner }: Props) {
  return (
    <Group
      wrap='nowrap' gap={"5px"} title={`${getName(owner)} (${getIdentity(owner)})`} className='text-truncate'>
      <Text fz="xs" fw={400}>
        {getName(owner)}
      </Text>
      <Text fz="xs" opacity={0.6} className='text-truncate'>
        ({getIdentity(owner)})
      </Text>
    </Group>
  );
}

const getName = (owner: Owner) => {
  let name = ""
  if (isCompany(owner)) 
    name = owner.name
  else if (isIndividual(owner)) 
    name = owner.firstName + " " + owner.lastName
  return name
}

const getIdentity = (owner: Owner) => {
  let identity = ""
  if (isCompany(owner)) 
    identity = owner.taxId
  else if (isIndividual(owner)) 
    identity = owner.nationalId
  return identity
}