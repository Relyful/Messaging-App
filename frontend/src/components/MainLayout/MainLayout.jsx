import styles from "./MainLayout.module.css";
import { Link } from "react-router";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";

function MainLayout() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftHeader}>
          <Link to='/' className={styles.headerLink}><h2>Rely&apos;s Chat</h2></Link>
        </div>
        <div className={styles.rightHeader}>
          <Link to='/'>Home</Link>
          <Link to='/chat'>Chat</Link>
        </div>
      </header>
      <main className={styles.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout;