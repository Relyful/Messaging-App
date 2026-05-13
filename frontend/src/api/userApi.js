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
};

export const fetchUserData = async (userId, controller = null) => {
  try {
    const response = await fetch(`http://localhost:8080/user/${userId}`, {
      signal: controller?.signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      console.log(response);
      throw new Error('Error fetching user data')
    };
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error)
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await fetch(`http://localhost:8080/user/updateDisplayName/${data.displayName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Error updating display name');
    };
    console.log(data.aboutMe)
    const response2 = await fetch(`http://localhost:8080/user/updateAbout/`, {
      body: JSON.stringify({'aboutMe': data.aboutMe}),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    if (!response2.ok) {
      throw new Error('Error updating about me');
    };
    console.log(response);
    console.log(response2);
  } catch (error) {
    console.error(error);
  }
}