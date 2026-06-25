import { useOutletContext, useParams } from "react-router";
import styles from "./Chat.module.css";
import { fetchChat } from "../../api/chatApi";
import { useEffect, useState } from "react";
import { useRef } from 'react';
import { sendMessage } from "../../api/messageApi";
import ChatMembersModal from "./ChatMembersModal";


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
  const [modalState, setModalState] = useState(false);
  
  const newMessageRef = useRef(null);

  async function loadChat(abortController) {
    const chatData = await fetchChat(params.chatId);
    setChat(chatData, abortController);    
  }

  async function sendMessageHandler() {
    await sendMessage(chat.id, newMessageRef.current.value);
    newMessageRef.current.value = '';
    await loadChat();
  }

  function modalToggle() {
    setModalState((prevState) => !prevState);
  };

  useEffect(() => {
    const controller = new AbortController();
    loadChat(controller);
    return () => controller.abort();
  }, [])

  return (
    <div className={styles.chatContainer}>
      {chat && <ChatMembersModal modalState={modalState} modalToggle={modalToggle} chatMembers={chat.chatMembers}/>}
      <div className={styles.chatHeader}>
        {chat && <div className={styles.chatName} onClick={modalToggle}>{chat.name ? chat.name : chat.chatMembers[0].user.displayName}</div>}
      </div>
      {chat && <div className={styles.chatContent}><ChatMessage chatMessages={chat.messages} user={user}/></div>}
      <div className={styles.replyBox}>
        <textarea name="newMessage" id="newMessage" ref={newMessageRef} className={styles.replyInput} rows={1}></textarea>
        <button className={styles.replyButton} onClick={sendMessageHandler}>Reply</button>
      </div>
    </div>
  );
}
