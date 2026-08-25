'use client'

import cn from 'classnames'
import { PropsWithChildren, useState } from 'react'
import { BurgerIcon, CrossIcon } from '../assets'
import { Button } from '../button'

import styles from './sidebar.module.css'

export function Sidebar({ children }: PropsWithChildren) {
  const [isOpen, setOpen] = useState(false)

  const toggleSidebar = () => {
    setOpen(!isOpen)
  }

  return (
    <>
      <nav className={styles.nav}>
        <Button.Icon iconAlt="Menu button" onClick={toggleSidebar}>
          <BurgerIcon />
        </Button.Icon>
      </nav>
      <aside
        className={cn(
          styles.container,
          isOpen && styles.container_is_open,
          !isOpen && styles.container_is_closed,
        )}
      >
        <Button.Icon iconAlt="Close button" onClick={toggleSidebar}>
          <CrossIcon />
        </Button.Icon>
        {children}
      </aside>
    </>
  )
}
