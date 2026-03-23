import styles from './Login.module.css';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${styles.formSubmitButt}`}>
      {pending ? "Loggin In..." : "Log In"}
    </button>
  );
}

async function onLogInSubmit(formData) {
const logInData = { username: formData.get("username"), password: formData.get("password") };
try {
  const response = await fetch('http://localhost:8080/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(logInData),
    });
    if (!response.ok) {
      throw new Error("Error logging in");
    }
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

export default function Login() {
  return (
    <div className={styles.logInContainer}>
      <form action={onLogInSubmit} method="post" className={styles.logInForm}>
        <input type="text" name="username" id="username" placeholder='Username' />
        <input type="password" name="password" id="password" placeholder='Password'/>
        <SubmitButton />
      </form>
    </div>
  );
}