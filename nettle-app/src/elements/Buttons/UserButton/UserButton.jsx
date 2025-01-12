import { IconChevronRight } from "@tabler/icons-react";
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "./UserButton.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export function UserButton() {
  const { displayName, photoUrl, email } = useSelector(
    (state) => state.auth.user._data
  );

  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate("/profile", { replace: true })}
      className={classes.user}
    >
      <Group>
        <Avatar src={photoUrl} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {displayName}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
