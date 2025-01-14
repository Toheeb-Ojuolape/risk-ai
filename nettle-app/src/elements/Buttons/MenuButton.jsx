/* eslint-disable react/prop-types */

import { Menu, rem, UnstyledButton } from "@mantine/core";
import { IconSettings, IconTrash, IconDots } from "@tabler/icons-react";
import { useNavigate } from "react-router";

function MenuButton({ id, handleDelete }) {
  const navigate = useNavigate();

  return (
    <Menu shadow="md">
      <Menu.Target>
        <UnstyledButton>
          <IconDots />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => navigate("/reports/" + id, { replace: true })}
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          View Report
        </Menu.Item>

        <Menu.Item
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => handleDelete(id)}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default MenuButton;
