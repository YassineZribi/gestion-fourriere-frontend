import { Group, Text } from "@mantine/core";
import ArticleFamily from "../../../types/ArticleFamily";

interface Props {
  articleFamily: ArticleFamily
}

export default function ArticleFamilySelectOption({ articleFamily }: Props) {
  return (
    <Group
      wrap='nowrap' title={articleFamily.name}>
      <Text fz="xs" fw={400} truncate='end'>
        {articleFamily.name}
      </Text>
    </Group>
  );
}