import styles from './ChatWindow.module.css'

function ChatWindow() {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatTopRow}>
        <h3 className={styles.topRowHeading}>Chat</h3>
        <div>New Chat</div>
      </div>
    </div>
  )
}

export default ChatWindow;