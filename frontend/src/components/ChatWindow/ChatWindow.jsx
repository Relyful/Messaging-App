import { useEffect, useState } from "react";
import styles from "./ChatWindow.module.css";
import { fetchMyChats } from "../../api/userApi";

function ChatRow({ data }) {
  console.log(data)
  return (
    <div className={styles.chatRow}>
      <div className={styles.chatName}>{data.name ? data.name : data.chatMembers[0].user.displayName}</div>
      <div className={styles.lastMessage}>{data.messages[0]?.content}</div>
    </div>
  );
}

function ChatWindow() {
  const [chats, setChats] = useState(null);

  const fetchChatHandler = async (controller) => {
    try {
      const chatData = await fetchMyChats(controller);
      setChats(chatData);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
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
      {chats ? chats.map((chat) => (
        <ChatRow key={chat.id} data={chat}/>
      )) : null}
    </div>
  );
}

export default ChatWindow;
