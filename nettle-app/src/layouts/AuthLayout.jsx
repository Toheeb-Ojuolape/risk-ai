import { Grid } from "@mantine/core";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <Grid align="center" justify="center" p={"20px"}>
        <Outlet />
    </Grid>
  );
}

export default AuthLayout;
