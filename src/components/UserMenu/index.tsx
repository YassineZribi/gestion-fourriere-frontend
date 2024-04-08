import { Menu, Group, useMantineTheme, ActionIcon, rem } from '@mantine/core';
import useAuthStore from '../../store/useAuthStore';
import { ArrowRightStartOnRectangleIcon, ArrowsRightLeftIcon, ChatBubbleBottomCenterTextIcon, Cog6ToothIcon, EllipsisVerticalIcon, HeartIcon, PauseIcon, StarIcon, TrashIcon } from '@heroicons/react/24/outline';

export function UserMenu() {
  const {logout} = useAuthStore()
  const theme = useMantineTheme();
  return (
    <Group justify="center">
      <Menu
        withArrow
        width={300}
        position="bottom"
        transitionProps={{ transition: 'pop' }}
        withinPortal
      >
        <Menu.Target>
          <ActionIcon style={{color: 'currentcolor'}} variant="transparent" size="xl">
            <EllipsisVerticalIcon style={{ width: rem(22), height: rem(22) }} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <HeartIcon
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.red[6]}
              />
            }
          >
            Liked posts
          </Menu.Item>
          <Menu.Item
            leftSection={
              <StarIcon
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.yellow[6]}
              />
            }
          >
            Saved posts
          </Menu.Item>
          <Menu.Item
            leftSection={
              <ChatBubbleBottomCenterTextIcon
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            }
          >
            Your comments
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            leftSection={<Cog6ToothIcon style={{ width: rem(16), height: rem(16) }} />}
          >
            Account settings
          </Menu.Item>
          <Menu.Item
            leftSection={
              <ArrowsRightLeftIcon style={{ width: rem(16), height: rem(16) }} />
            }
          >
            Change account
          </Menu.Item>
          <Menu.Item
            leftSection={<ArrowRightStartOnRectangleIcon style={{ width: rem(16), height: rem(16) }} />}
            onClick={logout}
          >
            Logout
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            leftSection={
              <PauseIcon style={{ width: rem(16), height: rem(16) }} />
            }
          >
            Pause subscription
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<TrashIcon style={{ width: rem(16), height: rem(16) }} />}
          >
            Delete account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}