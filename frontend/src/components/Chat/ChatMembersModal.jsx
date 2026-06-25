import styles from './ChatMembersModal.module.css'

export default function ChatMembersModal({ modalState, modalToggle, chatMembers }) {
  console.log(chatMembers)  

  return (
    <div className={`${styles.modalBackdrop} ${modalState ? styles.isOpen : null}`} onClick={modalToggle}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Chat members</h3>
        {/* User list goes here */}
        {/* {chatMembers} */}
        {chatMembers.map(element => {
          return <div key={element.user.id}>{element.user.username}</div>
        })}
      </div>
    </div>
  )
}