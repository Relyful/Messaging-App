import { useEffect, useState } from "react";
import styles from "./NewChat.module.css";
import { getAllUsers } from "../../api/userApi";
import { useOutletContext, useNavigate } from "react-router";
import { createNewChat, createNewGroupChat, existingChatCheck } from "../../api/chatApi";

function UserCards({ usersData, mode, chosenUsers, setChosenUsers }) {
  const { user } = useOutletContext();  
  const navigate = useNavigate();
  const filteredUsers = usersData.filter((userD) => userD.id != user.id);

  async function newChatOnClickHandler(id) {
    const check = await existingChatCheck(id);
    if (check) {
      return navigate(`/chat/${check.id}`);
    }
    const newChat = await createNewChat(id);
    navigate(`/chat/${newChat.id}`);
  }

  function newGroupChatOnClickHandler(userId) {
    if (chosenUsers.includes(userId)) {
      const newArray = chosenUsers.filter((item) => item !== userId);
      setChosenUsers(newArray);
    } else {
      setChosenUsers([...chosenUsers, userId]);
    }
  }

  const cards = filteredUsers.map((user) => {
    return (
      <div
        className={`${styles.userCard} ${chosenUsers.includes(user.id) ? styles.active : null}`}
        key={user.id}
        onClick={
          mode === "solo"
            ? () => newChatOnClickHandler(user.id)
            : () => newGroupChatOnClickHandler(user.id)
        }
      >
        <div className={styles.name}>{user.displayName || user.username}</div>
      </div>
    );
  });
  return cards;
}

export default function NewChat({ mode }) {
  const [users, setUsers] = useState(null);
  const [chosenUsers, setChosenUsers] = useState([]);
  const navigate = useNavigate();

  async function handleFetchUsers() {
    const users = await getAllUsers();
    setUsers(users);
  }

  useEffect(() => {
    handleFetchUsers();
  }, []);

  async function createNewGroupChatHandler(formData) {
    const userArray = chosenUsers;
    const chatName = formData.get("chatGroupName");
    const newGroupChat = await createNewGroupChat(userArray, chatName);
    navigate(`/chat/${newGroupChat.id}`);
  }

  return (
    <div className={styles.newChatContainer}>
      <div className={styles.headerContainer}>
        <h2>Start new chat</h2>
      </div>
      <div className={styles.userPicker}>
        {users && <UserCards usersData={users} mode={mode} chosenUsers={chosenUsers} setChosenUsers={setChosenUsers}/>}
      </div>
      {mode === "group" && (<form action={createNewGroupChatHandler}>
        <div className={styles.inputRow}>
          <label htmlFor="groupChatName">Group chat name: </label>
          <input type="text" name="chatGroupName" id="chatGroupName" />
        </div>
        <div className={styles.buttonGroupRow}>
          <button type="submit">Create chat</button>
        </div>
      </form>)}
    </div>
  );
}
