import { useOutletContext, Link } from "react-router";
import styles from "./Home.module.css";

export default function Home() {
  const { user } = useOutletContext();
  console.log(user);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heading}>
        <h2>Welcome to Rely&apos;s Chat</h2>
        <div className={styles.callToAction}>
          {!user ? (
            <>
              <p>
                <Link className={styles.actionLink} to={"/register"}>
                  Register
                </Link>{" "}
                to continue!
              </p>
              <p>
                Already an user?{" "}
                <Link className={styles.actionLink} to={"/login"}>
                  Log in!
                </Link>
              </p>
            </>
          ) : (
            <div>
              <Link className={styles.actionLink} to={"/chat"}>
                Continue
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.logo}>
        <svg
        className={styles.svgLogo}
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 28 80 V 20 H 58 C 72 20 72 48 58 48 H 28 M 46 48 L 72 80"
            stroke="white"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="20" r="3.5" fill="white" />
          <circle cx="72" cy="80" r="3.5" fill="white" />
        </svg>
      </div>
    </div>
  );
}
