import { Box, Tabs } from "@mantine/core";
import PasswordSettings from "../components/Settings/PasswordSettings";
import SecuritySettings from "../components/Settings/SecuritySettings";

function SettingsPage() {
  return (
    <Box maw={"1000px"} m={"auto"}>
      <Tabs defaultValue="first">
        <Tabs.List grow>
          <Tabs.Tab value="first">Password Settings</Tabs.Tab>
          <Tabs.Tab value="second">Security Settings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first"><PasswordSettings /></Tabs.Panel>
        <Tabs.Panel value="second"><SecuritySettings /></Tabs.Panel>
      </Tabs>
    </Box>
  );
}

export default SettingsPage;
