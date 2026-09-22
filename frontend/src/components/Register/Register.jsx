import { useState } from 'react';
import { registerUser } from '../../api/userApi';
import styles from './Register.module.css';

export default function Register() {
  const [formErrors, setFormErrors] = useState();

  async function registerSubmitHandler(formData) {
    const registerData = {
      'username': formData.get('username'),
      'password': formData.get('password'),
      'repeatPassword': formData.get('repeatPassword'),
    };
    const callServerRegister = await registerUser(registerData, setFormErrors);
    console.log(callServerRegister);    
  }

  return (
    <div className={styles.registerFormContainer}>
      <h2 className={styles.registerHeading}>Register</h2>
      {formErrors && <ErrorList errData={formErrors} />}
      <form action={registerSubmitHandler} className={styles.registerForm}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" className={styles.registerInput} placeholder='Username' required maxLength={12} minLength={4}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" className={styles.registerInput} placeholder='Password' required maxLength={20} minLength={5} />
        <label htmlFor="repeatPassword">Repeat password</label>
        <input type="password" name="repeatPassword" id="repeastPassword" className={styles.registerInput} placeholder='Repeat Password'  required maxLength={20} minLength={5} />
        <button className={styles.formSubmitButt} type="submit">Register</button>   
      </form>
    </div>
  )
}

function ErrorList({ errData }) {
  const errList = Object.entries(errData).map(([field, errorMsg]) => (
    <li key={field}>
      {`${field}: ${errorMsg}`}
    </li>
  ))

  return (<ul>
    {errList}
  </ul>)
}