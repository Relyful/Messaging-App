import { Link } from 'react-router';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footerContainer}>© 2026&nbsp; <Link to={'https://github.com/Relyful'} target='_blank'>Relyful</Link></footer>
  )
};

export default Footer;