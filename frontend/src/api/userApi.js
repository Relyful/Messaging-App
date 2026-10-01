const getAuthHeaders = (additionalHeaders = {}) => {
  const token = localStorage.getItem("token");
  return {
    ...additionalHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchUser = async (controller = null) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/me`, {
      headers: getAuthHeaders(),
      signal: controller?.signal,
    });
    if (!response.ok) {
      if (response.status === 404 || response.status === 401) {
        localStorage.removeItem("token");
        return false;
      }
      throw new Error("Auth failed");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    if (err.name !== "AbortError") console.error(err);
    return false;
  }
};

export const logOut = async () => {
  localStorage.removeItem("token");
  return true;
};

export const userLogIn = async (formData) => {
  const logInData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.errMessage || data.message || "Invalid credentials" };
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: err.message || "Error logging in" };
  }
};

export const registerUser = async (newUserData, setFormErrors) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.errors) {
        const mappedErr = data.errors.map((err) => err.msg);
        setFormErrors(mappedErr);
      }
      return { success: false };
    }
    return { success: true, data };
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserData = async (userId, controller = null) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/${userId}`, {
      signal: controller?.signal,
      method: "GET",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
    });
    if (!response.ok) {
      throw new Error("Error fetching user data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/user/updateDisplayName/${data.displayName}`,
      {
        method: "PUT",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
      }
    );
    const data1 = await response.json();
    let errArray = [];
    if (!response.ok) {
      data1.errors?.map((err) => errArray.push(err.msg));
      return { success: false, messageArr: errArray };
    }
    const response2 = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/updateAbout/`, {
      method: "PUT",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ aboutMe: data.aboutMe }),
    });
    const data2 = await response2.json();
    if (!response2.ok) {
      data2.errors?.map((err) => errArray.push(err.msg));
      return { success: false, messageArr: errArray };
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, messageArr: error.message };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/`, {
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
    });
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProfilePic = async (picId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/user/profilePic/${picId}`,
      {
        method: "PUT",
        headers: getAuthHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error("Error updating profile pic");
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};