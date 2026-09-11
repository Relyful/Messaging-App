import { useEffect, useState } from 'react';
import styles from './ToastNotification.module.css';

export default function ToastNotification({ message, type, onClose}) {
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    setVisible(true);

    const fadeOutTimer = setTimeout(() => setVisible(false), 4500);
    const autoCloseTimer = setTimeout(() => onClose(), 5000)

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(autoCloseTimer);
    }
  }, [message]);

  return (
    <div className={styles.modalContainer}>
      <div className={`${styles.modal} ${visible ? styles.open : ''} ${styles[type]}`}>
        {message}
      </div>
    </div>
  )
}