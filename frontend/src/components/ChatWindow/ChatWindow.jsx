import { useEffect, useState } from "react";
import styles from "./ChatWindow.module.css";
import { fetchMyChats } from "../../api/chatApi";
import { Link } from "react-router";


function ChatRow({ data }) {
  console.log(data)
  return (
       <div className={styles.chatRow}>
        <div className={styles.chatName}>{data.name ? data.name : data.chatMembers[0].user.displayName}</div>
        <div className={styles.lastMessage}>
          <div className={styles.messageInfo}>
            {data.messages?.length < 1 ? (
              'No messages yet'
            ) : (
              `${data.messages[0]?.author.username} said on ${new Date(data.messages[0]?.createdAt).toLocaleTimeString()}:`
            )}
      
          </div>
          <div className={styles.messageContent}>{data.messages[0]?.content}</div>
        </div>
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
        <Link to={`/chat/${chat.id}`} key={chat.id} className={styles.chatLink}><ChatRow data={chat}/></Link>
      )) : null}
    </div>
  );
}

export default ChatWindow;
