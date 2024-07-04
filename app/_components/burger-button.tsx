import Image from 'next/image';
import BurgerIcon from '@/public/burger.svg';
import Button from '@/app/_components/button';

import styles from '@/app/_components/burger-button.module.css';

type BurgerButtonProps = {
  toggleSidebar: () => void;
};

export default function BurgerButton({
  toggleSidebar,
}: BurgerButtonProps) {
  return (
    <nav className={styles.nav}>
      <Button
        className={styles.burger_button}
        onClick={toggleSidebar}
      >
        <Image
          priority
          src={BurgerIcon}
          alt="Menu button"
          height={24}
          width={24}
        />
      </Button>
    </nav>
  );
}
