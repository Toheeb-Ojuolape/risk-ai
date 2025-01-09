import { Outlet, useLocation } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import "./App.css";
import { ModalsProvider } from "@mantine/modals";
import { useEffect } from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <>
      <MantineProvider
        theme={{
          colors: {
            // Define a custom color palette or override the default one
            myPrimary: [
              "#83c99e",
              "#6abe8b",
              "#52b378",
              "#39a864",
              "#209d51", 
              "#0e4624",
              "#0b341b",
              "#072312",
              "#041109",
              "#000000",
            ],
          },
          primaryColor: "myPrimary", // Use the custom color palette as the primary color
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          <Notifications position="top-right" />
          <Outlet />
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
