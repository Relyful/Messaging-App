export const fetchMyChats = async (controller = null) => {
  try {
    const response = await fetch("http://localhost:8080/chat/my", {
      credentials: "include",
      signal: controller?.signal,
    });
    if (!response.ok) {
      throw new Error("Auth failed");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchChat = async (chatId, controller = null) => {
  try {
    const response = await fetch(`http://localhost:8080/chat/${chatId}`, {
      credentials: "include",
      signal: controller?.signal,
    });
    if (!response.ok) {
      throw new Error("Chat could not be loaded");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const existingChatCheck = async (chatterId) => {
  try {
    const response = await fetch(`http://localhost:8080/chat/user/${chatterId}`, {
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Error searching chat');
    };
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    return false;
  }
}