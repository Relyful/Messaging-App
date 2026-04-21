export const fetchUser = async (controller = null) => {
  try {
    const response = await fetch("http://localhost:8080/user/me", {
      credentials: "include",
      signal: controller?.signal,
    });
    if (!response.ok) {
      if (response.status == "404") {
        return false;
      }
      throw new Error("Auth failed");
    }
    console.log(response);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const logOut = async (controller = null) => {
  try {
    const response = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
      signal: controller?.signal,
    });
    if (!response.ok) {
      throw new Error("Logout failed");
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

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

export const sendMessage = async (chatId, newMessageContent) => {
  try {
    const response = await fetch(`http://localhost:8080/message/new/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({'content': newMessageContent}),
    });    
    if (!response.ok) {
      throw new Error("Error sending message");
    }
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}