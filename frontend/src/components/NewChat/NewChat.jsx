import { useEffect, useState } from 'react'
import styles from './NewChat.module.css'
import { getAllUsers } from '../../api/userApi';
import { useOutletContext, useNavigate } from 'react-router';
import { createNewChat, existingChatCheck } from '../../api/chatApi';

function UserCards({ usersData }) {
  const {user} = useOutletContext();
  const navigate = useNavigate();
  const filteredUsers = usersData.filter((userD) => userD.id != user.id);
  console.log(filteredUsers);

  async function newChatOnClickHandler(id) {
    const check = await existingChatCheck(id);
    if (check) {
      return navigate(`/chat/${check.id}`);
    };
    const newChat = await createNewChat(id);
    navigate(`/chat/${newChat.id}`);
  }

  const cards = filteredUsers.map((user) => {
    return (
      <div className={styles.userCard} key={user.id} onClick={() => newChatOnClickHandler(user.id)}>
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