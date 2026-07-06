'use client'

import cn from 'classnames'
import { ReactNode, useState } from 'react'
import { Button } from '../button'
import BurgerIcon from '@/public/burger.svg'
import CrossIcon from '@/public/cross.svg'

import styles from './sidebar.module.css'

type SidebarProps = {
  children: ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const [isOpen, setOpen] = useState(false)

  const toggleSidebar = () => {
    setOpen(!isOpen)
  }

  return (
    <>
      <nav className={styles.nav}>
        <Button.Icon
          iconAlt="Menu button"
          onClick={toggleSidebar}
          src={BurgerIcon}
        />
      </nav>
      <aside
        className={cn(
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
  )
}
