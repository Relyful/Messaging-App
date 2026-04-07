import { useParams } from "react-router";
import styles from "./Chat.module.css";

export default function Chat() {
  const params = useParams();
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>{`${params.chatId}`}</div>
      {/* <div className={styles.chatContent}>CHAT CONTENT WILL GO HERE</div> */}
    </div>
  )
}