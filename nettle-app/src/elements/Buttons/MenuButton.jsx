import { Menu, rem, UnstyledButton } from '@mantine/core';
import {
  IconSettings,
  IconTrash,
  IconDots,
} from '@tabler/icons-react';

function MenuButton() {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <UnstyledButton><IconDots /></UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
         View Report
        </Menu.Item>
       
        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}


export default MenuButton