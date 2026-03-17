import styles from "./MainLayout.module.css";
import { Link } from "react-router";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

function MainLayout() {
  const controller = new AbortController();
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/me", {
        credentials: "include",
        signal: controller.signal,
      });
      if (!response.ok) {
        if (response.status == '404') {
          // TODO: Set user to undefined 
          return console.log('User not logged in')
        }
        throw new Error("Auth failed");
      }
      // TODO: SET USER STATE
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  });

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
