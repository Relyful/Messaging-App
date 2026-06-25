import styles from "./Login.module.css";
import { useFormStatus } from "react-dom";
import { useOutletContext, useNavigate } from "react-router";
import { fetchUser } from "../../api/userApi";

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
  const {setUser} = useOutletContext();
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

  async function onLogInSubmit(formData) {
    const logInData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(logInData),
      });
      if (response.status === 401) {
        setUser(null);
      }
      if (!response.ok) {
        throw new Error("Error logging in");
      }
      await updateUser();
      navigate('/chat');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.logInContainer}>
      <h2 className={styles.loginHeader}>Log In</h2>
      <form action={onLogInSubmit} className={styles.logInForm}>
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
