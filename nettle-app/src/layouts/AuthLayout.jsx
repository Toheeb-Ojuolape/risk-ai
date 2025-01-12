import { Box } from "@mantine/core";
import { Outlet } from "react-router";

function AuthLayout() {
  const token = sessionStorage.getItem("authToken")
   //route guard
   if(token){
    window.location.href= "/dashboard"
  }

  return (
    <Box h={"1000px"} p={"20px"}>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AuthLayout;
