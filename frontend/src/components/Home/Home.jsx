import { useOutletContext, Link } from 'react-router';
import styles from './Home.module.css';


export default function Home() {
  const {user} = useOutletContext();
  console.log(user);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heading}>
        <h2>Welcome to Rely&apos;s Chat</h2>
        <div className={styles.callToAction}>
        {!user ? (
          <>
            <p><Link to={'/register'}>Register</Link> to continue!</p>
            <p>Already an user? <Link to={'/login'}>Log in!</Link></p>
          </>
        ) : (
        <div><Link to={'/chat'}>Continue</Link></div>
        )}
      </div>
      </div>      
      <div className={styles.logo}>
        This is going to be a logo
      </div>
    </div>
  )
}