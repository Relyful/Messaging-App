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
