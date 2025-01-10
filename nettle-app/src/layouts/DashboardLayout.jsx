import {
  AppShell,
  Avatar,
  Box,
  Grid,
  Flex,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "../elements/Navbar/Menu";
import { IconBell, IconMenu2, IconSearch } from "@tabler/icons-react";
import { Outlet } from "react-router";
import { unslugify } from "../utils";

function DashboardLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened] = useDisclosure(true);
  const pathname = unslugify(window.location.pathname)

  return (
    <AppShell
      padding="lg"
      bg={"#fbfbfb"}
      navbar={{
        width: 320,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Navbar>
        <NavBar toggleMobile={toggleMobile} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Flex mt={"2"} justify={"space-between"} bottom={"10"} hiddenFrom="sm">
          <Box onClick={toggleMobile}>
            <IconMenu2 />
          </Box>
          <Flex gap={"sm"}>
            <Avatar mt={"-5"} size={"md"}></Avatar>
            <IconBell />
          </Flex>
        </Flex>

        <Grid mt={"2"}>
          <Grid.Col span={{ base: 12, md: 6, lg: 7 }}>
            <Text fz={"h1"} fw={"bolder"}>
              {" "}
              {pathname}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6, lg: 11 }}>
                {" "}
                <TextInput
                  leftSection={<IconSearch />}
                  radius={"lg"}
                  size={"lg"}
                  placeholder={"Search anything here"}
                />
              </Grid.Col>
              <Grid.Col
                visibleFrom="lg"
                pt={16}
                span={{ base: 12, md: 6, lg: 1 }}
              >
                {" "}
                <IconBell size={30} />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        {/* <Flex justify={"space-between"} bottom={"10"} hiddenFrom="xl">
          <Text>Risk AI</Text>
          <Box onClick={toggleMobile}>
            <IconMenu2 />
          </Box>
        </Flex> */}
        <Box py={"36px"}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

export default DashboardLayout;
