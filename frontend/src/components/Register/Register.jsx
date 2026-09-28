import { useState } from 'react';
import { registerUser } from '../../api/userApi';
import styles from './Register.module.css';
import ErrorList from '../FormErrorList/FormErrorList';

export default function Register() {
  const [formErrors, setFormErrors] = useState([]);
  const [constrainErrors, setConstraintErrors] = useState({});

  async function registerSubmitHandler(formData) {
    setFormErrors(null);
    const registerData = {
      'username': formData.get('username'),
      'password': formData.get('password'),
      'repeatPassword': formData.get('repeatPassword'),
    };
    const callServerRegister = await registerUser(registerData, setFormErrors);
    console.log(callServerRegister);    
  }

  function handleFormChange(e) {
    const input = e.target;
    const passwordValue = e.currentTarget.elements.password.value;
    input.setCustomValidity('');

    if (input.name === 'repeatPassword' && input.value !== passwordValue) {
        input.setCustomValidity('Password must match!')
    };

    if (!input.checkValidity()) {
      if (input.name === 'username') {
        input.setCustomValidity('Username must be 4 to 12 characters long')
      };
      if (input.name === 'password') {
        input.setCustomValidity('Password must be 5 to 20 characters long')
      };      

      setConstraintErrors(prev => ({
        ...prev,
        [input.name]: input.validationMessage,
      }));
    } else {      
      setConstraintErrors(prev => ({
        ...prev,
        [input.name]: '',
      }))
    }
  }

  return (
    <div className={styles.registerFormContainer}>
      <h2 className={styles.registerHeading}>Register</h2>
      {formErrors.length > 0 && <ErrorList errData={formErrors} />}
      <form action={registerSubmitHandler} onChange={handleFormChange} className={styles.registerForm}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" className={styles.registerInput} placeholder='Username' required maxLength={12} minLength={4}/>
        {constrainErrors.username && <span className={styles.inputErr}>{constrainErrors.username}</span>}
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" className={styles.registerInput} placeholder='Password' required maxLength={20} minLength={5} />
        {constrainErrors.password && <span className={styles.inputErr}>{constrainErrors.password}</span>}
        <label htmlFor="repeatPassword">Repeat password</label>
        <input type="password" name="repeatPassword" id="repeastPassword" className={styles.registerInput} placeholder='Repeat Password'  required maxLength={20} minLength={5} />
        {constrainErrors.repeatPassword && <span className={styles.inputErr}>{constrainErrors.repeatPassword}</span>}
        <button className={styles.formSubmitButt} type="submit">Register</button>
      </form>
    </div>
  )
}
