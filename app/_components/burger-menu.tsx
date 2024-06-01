'use client';

import Image from 'next/image';
import React from 'react';
import BurgerIcon from '@/public/burger.svg';

import styles from '@/app/_components/burger-menu.module.css';

export default function BurgerMenu() {
  const [show, setShow] = React.useState(false);
  return (
    <button
      onClick={() => setShow(!show)}
      className={styles.button}
      type="button"
    >
      <Image
        priority
        src={BurgerIcon}
        alt="Menu button"
        height={24}
        width={24}
      />
    </button>
  );
}
