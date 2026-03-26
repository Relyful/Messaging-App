import styles from "./MainLayout.module.css";
import { Link } from "react-router";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { fetchUser } from "../../api/userApi";

function MainLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const userData = await fetchUser(controller);
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
    };

    getUser();
    return () => controller.abort();
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
          {user ? (
            <>
              <div className={styles.headerUsername}>{user.username}</div>
              <button className={styles.logOutButt}>Log Out</button>
            </>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </div>
      </header>
      <main className={styles.container}>
        <Outlet context={[setUser]} />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
