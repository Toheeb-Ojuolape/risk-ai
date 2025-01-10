import { Grid, Box } from "@mantine/core";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <Grid align="center" justify="center" p={"20px"}>
      <Box h={"100vh"}>
        <Outlet />
      </Box>
    </Grid>
  );
}

export default AuthLayout;
