import styles from "./MainLayout.module.css";
import { Link, useNavigate } from "react-router";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { fetchUser, logOut } from "../../api/userApi";
import ToastNotification from "../ToastNotification/ToastNotification";

function MainLayout() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const getUser = async (controller = null) => {
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getUser(controller);
    return () => controller.abort();
  }, []);

  async function logOutHandler() {
    const response = await logOut();
    if (!response) {
      setNotification({
        id: crypto.randomUUID(),
        message: "Error logging out",
        type: "error",
      });
    }
    await getUser();
    setNotification({
      id: crypto.randomUUID(),
      message: "Logout successful",
      type: "notification",
    });
    navigate("/");
  }

  return (
    <div className={styles.mainContainer}>
      {notification && (
        <ToastNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <header className={styles.header}>
        <div className={styles.leftHeader}>
          <Link to="/" className={styles.headerLink}>
            <h2>Rely&apos;s Chat</h2>
          </Link>
        </div>
        <div className={styles.rightHeader}>
          <Link to="/">Home</Link>
          {user && <Link to="/chat">Chat</Link>}
          {user ? (
            <>
              <div className={styles.headerUsername}>
                <Link to="/profile">{user.username}</Link>
              </div>
              <button className={styles.logOutButt} onClick={logOutHandler}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </header>

      <main className={styles.container}>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <Outlet context={{ user, setUser, setNotification, isLoading }} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
