import styles from "./Login.module.css";
import { useFormStatus } from "react-dom";
import { useOutletContext, useNavigate } from "react-router";
import { fetchUser, userLogIn } from "../../api/userApi";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${styles.formSubmitButt}`}
    >
      {pending ? "Loggin In..." : "Log In"}
    </button>
  );
}

export default function Login() {
  const {setUser, setNotification} = useOutletContext();
  const navigate = useNavigate();

  async function updateUser() {
    try {
      const userData = await fetchUser();
      if (!userData) {
        setUser(undefined);
      } else {
        setUser(userData);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch user:", error);
        setUser(undefined);
      }
    }
  }

  async function loginHandler(formData) {
    const response = await userLogIn(formData);
    if (!response.success) {
      setUser(null);
      setNotification({id: crypto.randomUUID(), message: response.error, type: 'error'});
      return await updateUser();
    }
    await updateUser();
    setNotification({id: crypto.randomUUID(), message: 'Login successful', type: 'notification'});
    navigate('/chat');
  }

  return (
    <div className={styles.logInContainer}>
      <h2 className={styles.loginHeader}>Log In</h2>
      <form action={loginHandler} className={styles.logInForm}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className={styles.loginInput}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className={styles.loginInput}
        />
        <SubmitButton />
      </form>
    </div>
  );
}
