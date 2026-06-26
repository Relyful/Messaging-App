import styles from './ChatMembersModal.module.css'

function ChatMemberList({ chatMembers }) {
  const list = chatMembers.map(element => {
          return <div className={styles.gCMemberRow} key={element.user.id}>{element.user.displayName ? element.user.displayName : element.user.username}</div>
        })
  return (
    <div className={styles.memberListContainer}>
      {list}
    </div>
  )
}

export default function ChatMembersModal({ modalState, modalToggle, chatMembers }) {
  return (
    <div className={`${styles.modalBackdrop} ${modalState ? styles.isOpen : null}`} onClick={modalToggle}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={modalToggle}>&times;</button>
        <h3 className={styles.chatMembersHeading}>Chat members</h3>
        <ChatMemberList chatMembers={chatMembers}/>
      </div>
    </div>
  )
}