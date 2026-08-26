import { registerUser } from '../../api/userApi';
import styles from './Register.module.css';

export default function Register() {

  async function registerSubmitHandler(formData) {
    const registerData = {
      'username': formData.get('username'),
      'password': formData.get('password'),
    };
    const callServerRegister = await registerUser(registerData);
    console.log(callServerRegister);    
  }

  return (
    <div className={styles.registerFormContainer}>
      <h2 className={styles.registerHeading}>Register</h2>
      <form action={registerSubmitHandler} className={styles.registerForm}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" className={styles.registerInput} placeholder='Username' />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" className={styles.registerInput} placeholder='Password' />
        <label htmlFor="repeatPassword">Repeat password</label>
        <input type="password" name="repeatPassword" id="repeastPassword" className={styles.registerInput} placeholder='Repeat Password' />
        <button className={styles.formSubmitButt} type="submit">Submit</button>   
      </form>
    </div>
  )
}