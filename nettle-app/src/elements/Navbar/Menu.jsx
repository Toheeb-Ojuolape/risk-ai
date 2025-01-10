/* eslint-disable react/prop-types */

import {
  IconLayoutDashboard,
  IconLocationDollar,
  IconLockAccess,
  IconLogout,
  IconMessageUser,
  IconReportAnalytics,
  IconSettings2,
} from "@tabler/icons-react";
import { Code, Group } from "@mantine/core";
import classes from "./menu.module.css";
import { UserButton } from "../Buttons/UserButton/UserButton";

const data = [
  { link: "dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "assets", label: "Assets", icon: IconLocationDollar },
  { link: "reports", label: "Reports", icon: IconReportAnalytics },
  { link: "", label: "AI Assistant", icon: IconMessageUser },
  { link: "settings", label: "Settings", icon: IconSettings2 },
  { link: "security", label: "Security", icon: IconLockAccess },
];

function NavBar({ toggleMobile }) {
  const pathname = window.location.pathname.slice(1);

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.link === pathname || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        window.location.href = item.link;
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
          {/* <MantineLogo size={28} inverted style={{ color: 'white' }} /> */}
          <Code fw={700} fz={"h3"} className={classes.version}>
            RiskAI
          </Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <UserButton />

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
