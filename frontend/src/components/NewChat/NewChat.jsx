import { useEffect, useState } from 'react'
import styles from './NewChat.module.css'
import { getAllUsers } from '../../api/userApi';
import { useOutletContext } from 'react-router';

function UserCards({ usersData }) {
  const {user} = useOutletContext();
  const filteredUsers = usersData.filter((userD) => userD.id != user.id);
  console.log(filteredUsers);
  const cards = filteredUsers.map((user) => {
    return (
      <div className={styles.userCard} key={user.id}>
        <div className={styles.name}>
          {user.displayName || user.username}
        </div>
      </div>
    )
  }) 
  return cards;
}


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
        <h2>Start new chat</h2>
      </div>
      <div className={styles.userPicker}>
        {users && <UserCards usersData = {users}/>}
      </div>
    </div>
  )
};