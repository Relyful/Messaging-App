import styles from './Register.module.css';

export default function Register() {
  return (
    <div className={styles.registerFormContainer}>
      <h2 className={styles.registerHeading}>Register</h2>
      <form action='' className={styles.registerForm}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" className={styles.registerInput} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" className={styles.registerInput} />
        <label htmlFor="repeatPassword">Repeat password</label>
        <input type="password" name="repeatPassword" id="repeastPassword" className={styles.registerInput} />
        <label htmlFor="displayName">Display name</label>
        <input type="text" name="displayName" id="displayName" className={styles.registerInput} />     
        <button type="button">Submit</button>   
      </form>
    </div>
  )
}