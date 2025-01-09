import { AppShell, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "../elements/Navbar/Menu";
import { IconMenu2 } from "@tabler/icons-react";
import { Outlet } from "react-router";

function DashboardLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      bg={"#fbfbfb"}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Navbar>
        <NavBar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Box onClick={toggleMobile} hiddenFrom="sm">
          <IconMenu2 />
        </Box>

        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default DashboardLayout;
