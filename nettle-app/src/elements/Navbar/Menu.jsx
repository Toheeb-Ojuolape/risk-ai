/* eslint-disable react/prop-types */

import {
  IconLayoutDashboard,
  IconLocationDollar,
  IconLogout,
  IconMessageUser,
  IconReportAnalytics,
  IconSettings2,
} from "@tabler/icons-react";
import { Code, Group } from "@mantine/core";
import classes from "./menu.module.css";
import { UserButton } from "../Buttons/UserButton/UserButton";
import { logoutUser } from "../../store/auth.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const data = [
  { link: "dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "assets", label: "Assets", icon: IconLocationDollar },
  { link: "reports", label: "Reports", icon: IconReportAnalytics },
  { link: "ai-assistant", label: "AI Assistant", icon: IconMessageUser },
  { link: "settings", label: "Settings", icon: IconSettings2 },
];

function NavBar({ toggleMobile }) {
  const pathname = window.location.pathname.slice(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.link === pathname || undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        navigate(`/${item.link}`, {replace: true})
        toggleMobile();
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700} fz={"h3"} className={classes.version}>
            RiskAI
          </Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <UserButton />

        <a
          className={classes.link}
          onClick={() => {
            dispatch(logoutUser());
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
