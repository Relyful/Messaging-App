import { useEffect } from 'react';
import styles from './Profile.module.css';
import { fetchUserData } from '../../api/userApi';
import { useOutletContext } from 'react-router';

export default function Profile() {
  // Fetch stuff from backend based on users id saved in user state
  // Add userData state and keep data there.
  const { user }  = useOutletContext();

  useEffect(() => {
    const controller = new AbortController();
    if (user) {
      fetchUserData(user.id, controller);    }
    return () => controller.abort();
  }, [user]);

  return (
    <div className={styles.profileContainer}>
      <h2>User profile</h2>
      <div className={styles.profileContainer}>
        <div className={styles.profilePicture}>

        </div>
        <div className={styles.infoContainer}>
          <div className={styles.displayName}></div>
          <div className={styles.aboutMe}></div>
        </div>
      </div>
    </div>
  )
}