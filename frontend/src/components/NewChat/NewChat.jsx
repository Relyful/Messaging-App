import { useEffect, useState } from 'react'
import styles from './NewChat.module.css'
import { getAllUsers } from '../../api/userApi';
import { useOutletContext, useNavigate } from 'react-router';
import { createNewChat, existingChatCheck } from '../../api/chatApi';

function UserCards({ usersData, mode }) {
  const {user} = useOutletContext();
  const [chosenUsers, setChosenUsers] = useState([]);
  const navigate = useNavigate();
  const filteredUsers = usersData.filter((userD) => userD.id != user.id);

  async function newChatOnClickHandler(id) {
    const check = await existingChatCheck(id);
    if (check) {
      return navigate(`/chat/${check.id}`);
    };
    const newChat = await createNewChat(id);
    navigate(`/chat/${newChat.id}`);
  }

  function newChatOnClickHandlerGroup(userId) {
    console.log(userId);
    setChosenUsers([...chosenUsers, userId]);
    //remove choice on second click
  }

  const cards = filteredUsers.map((user) => {
    return (
      <div className={`${styles.userCard} ${chosenUsers.includes(user.id) ? styles.active : null}`} key={user.id} onClick={mode === "solo" ? () => newChatOnClickHandler(user.id) : () => newChatOnClickHandlerGroup(user.id)}>
        <div className={styles.name}>
          {user.displayName || user.username}
          {`${mode}`}
        </div>
      </div>
    )
  }) 
  return cards;
}


export default function NewChat({ mode }) {
  const [users, setUsers] = useState(null);

  async function handleFetchUsers() {
    const users = await getAllUsers();
    setUsers(users);
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
        {users && <UserCards usersData={users} mode={mode} />}
      </div>
    </div>
  )
};