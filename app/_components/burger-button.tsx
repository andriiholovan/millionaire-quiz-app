import Image from 'next/image';
import BurgerIcon from '@/public/burger.svg';

import styles from '@/app/_components/burger-button.module.css';

type BurgerButtonProps = {
  toggleSidebar: () => void;
};

export default function BurgerButton({
  toggleSidebar,
}: BurgerButtonProps) {
  return (
    <nav className={styles.nav}>
      <button
        className={styles.button}
        onClick={toggleSidebar}
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
    </nav>
  );
}
