export const fetchMyChats = async (controller = null) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/chat/my`, {
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
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/chat/${chatId}`, {
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
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/chat/user/${chatterId}`,
      {
        credentials: "include",
      },
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
        credentials: "include",
      },
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
    console.log(chatterArray);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/chat/newGroupChat`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userArray: chatterArray, chatName: chatName }),
    });
    const data = await response.json();
    if (!response.ok) {
      const mappedErr = data.errors?.map(err => err.msg)
      return ({
        success: false,
        error: mappedErr
      })
    }
    return ({success: true, data});
  } catch (error) {
    console.error(error);
    return ({
      success: false, 
      error: 'Problem contacting server',
    })
  }
};

export const deleteChat = async (chatId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/chat/delete/${chatId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Error deleting chat');
    };
    return response;
  } catch (error) {
    console.error(error);
  }
};