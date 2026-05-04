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

export const registerUser = async (newUserData) => {
  try {
    const response = await fetch(`http://localhost:8080/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(newUserData)
    });
    if (!response.ok) {
      throw new Error("Error registering user")
    };
    return response;
  } catch (error) {
    console.error(error);
  }
}