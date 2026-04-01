import { useEffect } from "react";
import styles from "./ChatWindow.module.css";
import { fetchMyChats } from "../../api/userApi";

function ChatRow() {
  return (
    <div className={styles.chatRow}>
      <div className={styles.chatName}></div>
      <div className={styles.lastMessage}></div>
    </div>
  );
}

function ChatWindow() {
  const fetchChatHandler = async (controller) => {
    try {
      const chats = await fetchMyChats(controller);
      return chats;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchChatHandler(controller);
    return () => controller.abort();
  }, []);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatTopRow}>
        <h3 className={styles.topRowHeading}>Chat</h3>
        <div>New Chat</div>
      </div>
      <ChatRow />
    </div>
  );
}

export default ChatWindow;
