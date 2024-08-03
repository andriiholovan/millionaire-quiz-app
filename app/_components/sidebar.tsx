'use client';

import classNames from 'classnames';
import React, { useState } from 'react';
import Button from '@/app/_components/button';
import BurgerIcon from '@/public/burger.svg';
import CrossIcon from '@/public/cross.svg';

import styles from '@/app/_components/sidebar.module.css';

type SidebarProps = {
  children: React.ReactNode;
};

export default function Sidebar({
  children,
}: SidebarProps) {
  const [isOpen, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <nav className={styles.nav}>
        <Button.Icon
          iconAlt="Menu button"
          onClick={toggleSidebar}
          src={BurgerIcon}
        />
      </nav>
      <aside className={classNames(
        styles.container,
        isOpen && styles.container_is_open,
        !isOpen && styles.container_is_closed,
      )}
      >
        <Button.Icon
          iconAlt="Close button"
          onClick={toggleSidebar}
          src={CrossIcon}
        />
        {children}
      </aside>
    </>
  );
}
