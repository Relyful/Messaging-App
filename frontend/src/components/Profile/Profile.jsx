import styles from './Profile.module.css';

export default function Profile() {
  // Fetch stuff from backend based on users id saved in user state
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