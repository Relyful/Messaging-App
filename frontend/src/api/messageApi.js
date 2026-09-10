export const sendMessage = async (chatId, newMessageContent) => {
  try {
    const response = await fetch(
      `http://localhost:8080/message/new/${chatId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content: newMessageContent }),
      },
    );
    if (!response.ok) {
      throw new Error("Error sending message");
    }
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export const softDeleteMessage = async (messageId) => {
  try {
    const response = await fetch(`http://localhost:8080/message/delete/${messageId}`, {
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