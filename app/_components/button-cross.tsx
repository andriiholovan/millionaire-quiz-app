import Image from 'next/image';
import CrossIcon from '@/public/cross.svg';

import styles from '@/app/_components/button-cross.module.css';

type ButtonCrossProps = {
  toggleSidebar: () => void;
};

export default function ButtonCross({
  toggleSidebar,
}: ButtonCrossProps) {
  return (
    <button
      onClick={toggleSidebar}
      className={styles.button}
      type="button"
    >
      <Image
        priority
        src={CrossIcon}
        alt="Close button"
        height={24}
        width={24}
      />
    </button>
  );
}
