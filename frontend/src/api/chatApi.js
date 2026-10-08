const getAuthHeaders = (additionalHeaders = {}) => {
  const token = localStorage.getItem("token");
  return {
    ...additionalHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchMyChats = async (controller = null) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/chat/my`, {
      headers: getAuthHeaders(),
      signal: controller?.signal,
    });
    if (!response.ok) {
      throw new Error("Auth failed");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    if (err.name !== "AbortError") console.error(err);
  }
};

export const fetchChat = async (chatId, controller = null) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/chat/${chatId}`, {
      headers: getAuthHeaders(),
      signal: controller?.signal,
    });
    if (!response.ok) {
      throw new Error("Chat could not be loaded");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    if (err.name !== "AbortError") console.error(err);
  }
};

export const existingChatCheck = async (chatterId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/chat/user/${chatterId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error("Error searching chat");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const createNewChat = async (chatterId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/chat/user/${chatterId}`,
      {
        method: "POST",
        headers: getAuthHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error("Error creating chat");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createNewGroupChat = async (chatterArray, chatName) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/chat/newGroupChat`, {
      method: "POST",
      headers: getAuthHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ userArray: chatterArray, chatName: chatName }),
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.errMessage) {
        return {
          success: false,
          error: data.errMessage,
        }
      }
      const mappedErr = data.errors?.map((err) => err.msg);
      return {
        success: false,
        error: mappedErr,
      };
    }
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Problem contacting server",
    };
  }
};

export const deleteChat = async (chatId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/chat/delete/${chatId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Error deleting chat");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
