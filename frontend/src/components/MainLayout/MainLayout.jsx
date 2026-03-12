import styles from "./MainLayout.module.css";
import { Link } from "react-router";

function MainLayout() {
  return (
    <header>
      <Link to='/' className={styles.headerLink}><h2>Rely&aposs Chat</h2></Link>
    </header>
  )
}

export default MainLayout;