import styles from "./MainLayout.module.css";
import { Link } from "react-router";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";

function MainLayout() {
  const [user, setUser] = useState(null);

  const fetchUser = async (controller) => {
    try {
      const response = await fetch("http://localhost:8080/user/me", {
        credentials: "include",
        signal: controller.signal,
      });
      if (!response.ok) {
        if (response.status == '404') {
          setUser(undefined);
          return console.log('User not logged in')
        }
        throw new Error("Auth failed");
      }
      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchUser(controller);
    return () => controller.abort;
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftHeader}>
          <Link to="/" className={styles.headerLink}>
            <h2>Rely&apos;s Chat</h2>
          </Link>
        </div>
        <div className={styles.rightHeader}>
          <Link to="/">Home</Link>
          <Link to="/chat">Chat</Link>
          {user ? <div>{user.username}</div> : <Link to='/login'>Log In</Link>}
        </div>
      </header>
      <main className={styles.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
