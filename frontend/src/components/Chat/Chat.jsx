import { useParams } from "react-router";
import styles from "./Chat.module.css";
import { fetchChat } from "../../api/userApi";
import { useEffect, useState } from "react";

function ChatMessage({ chatMessages }) {
  const formattedMessages = chatMessages.map((message) => (
    <div className={styles.message} key={message.id}>
      {message.content}
    </div>
  ));
  return formattedMessages;
}

export default function Chat() {
  const [chat, setChat] = useState(null);
  const params = useParams();

  async function loadChat(abortController) {
    const chatData = await fetchChat(params.chatId);
    setChat(chatData, abortController);    
  }

  useEffect(() => {
    const controller = new AbortController();
    loadChat(controller);
    return () => controller.abort();
  }, [])

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        {chat && <div className={styles.chatName}>{chat.name ? chat.name : chat.chatMembers[0].user.displayName}</div>}
      </div>
      {/* <div className={styles.chatContent}>CHAT CONTENT WILL GO HERE</div> */}
      {chat && <ChatMessage chatMessages={chat.messages} />}
    </div>
  );
}
