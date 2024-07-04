import Image from 'next/image';
import Button from '@/app/_components/button';
import CrossIcon from '@/public/cross.svg';

import styles from '@/app/_components/button-cross.module.css';

type ButtonCrossProps = {
  toggleSidebar: () => void;
};

export default function ButtonCross({
  toggleSidebar,
}: ButtonCrossProps) {
  return (
    <Button
      className={styles.button_cross}
      onClick={toggleSidebar}
    >
      <Image
        priority
        src={CrossIcon}
        alt="Close button"
        height={24}
        width={24}
      />
    </Button>
  );
}
