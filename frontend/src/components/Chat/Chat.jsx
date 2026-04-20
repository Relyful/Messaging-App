import { useOutletContext, useParams } from "react-router";
import styles from "./Chat.module.css";
import { fetchChat } from "../../api/userApi";
import { useEffect, useState } from "react";

function ChatMessage({ chatMessages, user }) {
  const formattedMessages = chatMessages.map((message) => {
    let thisUser = null;
    if (user.id !== message.authorId) {
      thisUser = false;
    } else {
      thisUser = true;
    }
    return (<div className={`${styles.message} ${thisUser ? styles.thisUser : styles.otherUser}`} key={message.id}>
    <div className={styles.nameCard}>{message.author.username}: </div>
    <div className={styles.messageContent} >
      {message.content}
    </div>
    </div>)
});
  return formattedMessages;
}

export default function Chat() {
  const [chat, setChat] = useState(null);
  const params = useParams();
  const {user} = useOutletContext(); 

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
      {chat && <div className={styles.chatContent}><ChatMessage chatMessages={chat.messages} user={user}/></div>}
    </div>
  );
}
