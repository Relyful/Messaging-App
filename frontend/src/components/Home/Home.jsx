import { useOutletContext } from 'react-router';
import styles from './Home.module.css';

export default function Home() {
  const {user} = useOutletContext();
  console.log(user);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Welcome to Rely&apos;s Chat</h2>
      </div>
      <div className={styles.callToAction}>
        {!user ? (
          <>
            <p>Register to continue!</p>
            <p>Already an user? Log in!</p>
          </>
        ) : (
        <div>Continue</div>
        )}
      </div>
    </div>
  )
}