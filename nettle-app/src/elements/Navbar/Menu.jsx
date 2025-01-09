import { useState } from 'react';
import {
  IconLayoutDashboard,
  IconLocationDollar,
  IconLockAccess,
  IconLogout,
  IconMessageUser,
  IconReportAnalytics,
  IconSettings2,
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import classes from './menu.module.css';
import { UserButton } from '../Buttons/UserButton/UserButton';

const data = [
  { link: '', label: 'Dashboard', icon: IconLayoutDashboard },
  { link: '', label: 'Assets', icon: IconLocationDollar },
  { link: '', label: 'Reports', icon: IconReportAnalytics },
  { link: '', label: 'AI Assistant', icon: IconMessageUser },
  { link: '', label: 'Settings', icon: IconSettings2 },
  { link: '', label: 'Security', icon: IconLockAccess}
];

function NavBar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
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
          <Code fw={700} className={classes.version}>
            v3.1.2
          </Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <UserButton />

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}


export default NavBar