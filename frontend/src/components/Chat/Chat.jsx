import { useOutletContext, useParams } from "react-router";
import styles from "./Chat.module.css";
import { fetchChat } from "../../api/chatApi";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { sendMessage, softDeleteMessage } from "../../api/messageApi";
import ChatMembersModal from "./ChatMembersModal";
import optionsPng from "../../assets/icon_menu.png";
import DeleteModal from "../DeleteModal/DeleteModal";

function ChatMessage({ chatMessages, user, onDeleteMessage }) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const toggleMenu = (messageId, e) => {
    e.stopPropagation();
    setActiveMenuId((prev) => (prev === messageId ? null : messageId));
  };

  const formattedMessages = chatMessages.map((message) => {
    let thisUser = null;
    if (user.id !== message.authorId) {
      thisUser = false;
    } else {
      thisUser = true;
    }
    const date = new Date(message.createdAt);
    const format = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const formattedDateTime = format.format(date);
    const isMenuOpen = activeMenuId === message.id;

    return (
      <div
        className={`${styles.messageContainer} ${thisUser ? styles.thisUser : styles.otherUser}`}
        key={message.id}
      >
        <div className={styles.nameCard}>
          {message.author.displayName || message.author.username} on{" "}
          {formattedDateTime}:
        </div>
        <div className={styles.messageContent}>{message.content}</div>
        {thisUser && <div className={styles.optionWrapper}>
          <button
            className={`${styles.optionButton} ${
              isMenuOpen ? styles.activeOptionButton : ""
            }`}
            onClick={(e) => toggleMenu(message.id, e)}
            aria-label="Message options"
          >
            <img src={optionsPng} alt="Option button" />
          </button>
          {isMenuOpen && (
            <div className={styles.dropdownMenu}>
              <button
                className={`${styles.menuItem} ${styles.deleteItem}`}
                onClick={() => {
                  onDeleteMessage(message.id);
                  setActiveMenuId(null);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>}
      </div>
    );
  });
  return formattedMessages;
}

export default function Chat() {
  const [chat, setChat] = useState(null);
  const params = useParams();
  const { user } = useOutletContext();
  const [modalState, setModalState] = useState(false);
  const [deletingMessage, setDeletingMessage] = useState(null);

  const newMessageRef = useRef(null);

  async function loadChat(abortController) {
    const chatData = await fetchChat(params.chatId, abortController);
    setChat(chatData);
  }

  async function sendMessageHandler() {
    await sendMessage(chat.id, newMessageRef.current.value);
    newMessageRef.current.value = "";
    await loadChat();
  }

  function modalToggle() {
    setModalState((prevState) => !prevState);
  }

  async function deleteMessageHandler() {
    const deleteStatus = await softDeleteMessage(deletingMessage);
    if (!deleteStatus.success) {
      // PASS ERROR TO TOAST NOTIFICATION
      return;
    };
    setChat((prev) => ({
      ...prev,
      messages: prev.messages.filter((c) => c.id !== deletingMessage)
    }));
    setDeletingMessage(null);
    // Send toast notif data
  };

  useEffect(() => {
    const controller = new AbortController();
    loadChat(controller);
    return () => controller.abort();
  }, []);

  if (!chat) {
    return (
      <div className={styles.chatContainerLoading}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  return (
    <div className={styles.chatContainer}>
      {chat && (
        <ChatMembersModal
          modalState={modalState}
          modalToggle={modalToggle}
          chatMembers={chat.chatMembers}
        />
      )}
      <div className={styles.chatHeader}>
        {chat && (
          <div
            className={`${styles.chatName} ${chat.type == "GROUP" ? styles.groupLinkHeader : null}`}
            onClick={chat.type == "GROUP" ? modalToggle : null}
          >
            {chat.name
              ? chat.name
              : chat.chatMembers[0].user.displayName ||
                chat.chatMembers[0].user.username}
          </div>
        )}
      </div>
      {chat && user && (
        <div className={styles.chatContent}>
          <ChatMessage chatMessages={chat.messages} user={user} onDeleteMessage={setDeletingMessage} />
        </div>
      )}
      <div className={styles.replyBox}>
        <textarea
          name="newMessage"
          id="newMessage"
          ref={newMessageRef}
          className={styles.replyInput}
          rows={1}
        ></textarea>
        <button className={styles.replyButton} onClick={sendMessageHandler}>
          Reply
        </button>
      </div>
      <DeleteModal
              isOpen={deletingMessage}
              chatName={'this message'}
              onConfirm={deleteMessageHandler}
              onClose={() => setDeletingMessage(null)}
            />
    </div>
  );
}
