export const sendMessage = async (chatId, newMessageContent) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/message/new/${chatId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content: newMessageContent }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return ({
        success: false,
        error: data.errors[0].msg
      });
    }
    return ({
      success: true,
      data
    });
  } catch (err) {
    console.error(err);
  }
};

export const softDeleteMessage = async (messageId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/message/delete/${messageId}`, {
      method: 'DELETE',
      credentials: 'include',      
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      return {
        success: false,
        error: errorData?.errMessage || 'Server Error'
      }
    }
    return {
      success: true,
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Network or server error'
    }
  }
}