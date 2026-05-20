import { useEffect, useState } from 'react'
import styles from './NewChat.module.css'
import { getAllUsers } from '../../api/userApi';

// function UserCards({ usersData }) {
//   // const cards = usersData.filter((user) => {})
//   // Map filtered array and create user cards
// }


export default function NewChat() {
  const [users, setUsers] = useState(null);

  async function handleFetchUsers() {
    const users = await getAllUsers();
    setUsers(users);
    console.log(users);
  }

  useEffect(() => {
    handleFetchUsers();
  }, [])

  return (
    <div className={styles.newChatContainer}>
      <div className={styles.headerContainer}>
        <h2>This is a header</h2>
      </div>
      <div className={styles.userPicker}>
        {/* Show all users available to chat */}
        {`${users}`}
      </div>
    </div>
  )
};