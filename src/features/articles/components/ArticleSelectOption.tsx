import { Avatar, Group, Text, rem } from "@mantine/core";
import Article from "../../../types/Article";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { getFullResourcePath } from "../../../lib/axios/api";

interface Props {
  article: Article
}

export default function ArticleSelectOption({ article }: Props) {
  return (
    <Group
      wrap='nowrap' title={`${article.name}`} style={{height: '100%'}}>
      <Avatar
        styles={{ root: { height: "100%" } }}
        // style={{ border: "1px solid" }}
        src={article.photoPath ? getFullResourcePath(article.photoPath) : ""}
        radius={"sm"}
      ><PhotoIcon style={{ width: "80%" }} /></Avatar>
      <Group gap={"5px"} wrap='nowrap' className='text-truncate'>
        <Text fz="xs" fw={700}>
          {article.name}
        </Text>
      </Group>
    </Group>
  );
}