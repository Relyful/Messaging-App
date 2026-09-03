import { useEffect, useState } from "react";
import styles from "./ChatWindow.module.css";
import { deleteChat, fetchMyChats } from "../../api/chatApi";
import { Link } from "react-router";
import DeleteModal from "../DeleteModal/DeleteModal";

function ChatRow({ data, onDeleteClick }) {
  const chatName =
    data.name ||
    data.chatMembers[0]?.user.displayName ||
    data.chatMembers[0]?.user.username;

  const handleClickDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteClick();
  };

  return (
    <div className={styles.chatRow}>
      <div className={styles.chatName}>{chatName}</div>
      <div className={styles.rightSideRow}>
        <div className={styles.lastMessage}>
          <div className={styles.messageInfo}>
            {data.messages?.length < 1
              ? "No messages yet"
              : `${data.messages[0]?.author.displayName || data.messages[0]?.author.username} said on ${new Date(data.messages[0]?.createdAt).toLocaleTimeString()}:`}
          </div>
          <div className={styles.messageContent}>
            {data.messages[0]?.content}
          </div>
        </div>
        <button
          type="button"
          aria-label="Delete chat"
          className={styles.deleteChatButton}
          onClick={handleClickDelete}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

function ChatWindow() {
  const [chats, setChats] = useState(null);
  const [deletingChat, setDeletingChat] = useState(null);

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

  const handleConfirmDelete = async () => {
    if (!deletingChat) return;

    try {
      const response = await deleteChat(deletingChat.id);
      if (response.ok) {
        setChats((prev) => prev.filter((c) => c.id !== deletingChat.id));
        setDeletingChat(null);
      } else {
        throw new Error('Delete request failed.')
      }      
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchChatHandler(controller);
    return () => controller.abort();
  }, []);

  const deletingChatName =
    deletingChat?.name ||
    deletingChat?.chatMembers?.[0]?.user?.displayName ||
    deletingChat?.chatMembers?.[0]?.user?.username;

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatTopRow}>
        <h3 className={styles.topRowHeading}>Your chats</h3>
        <div className={styles.newChatLinks}>
          <Link to={`/chat/new-group`}>New Group Chat</Link>
          <Link to={`/chat/new`}>New Chat</Link>
        </div>
      </div>

      {chats
        ? chats.map((chat) => (
            <Link
              to={`/chat/${chat.id}`}
              key={chat.id}
              className={styles.chatLink}
            >
              <ChatRow
                data={chat}
                onDeleteClick={() => setDeletingChat(chat)}
              />
            </Link>
          ))
        : null}

      <DeleteModal
        isOpen={deletingChat}
        chatName={deletingChatName}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingChat(null)}
      />
    </div>
  );
}

export default ChatWindow;
