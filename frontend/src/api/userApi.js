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

export const registerUser = async (newUserData, setFormErrors) => {
  try {
    const response = await fetch(`http://localhost:8080/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(newUserData)
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.errors) {
        const mappedErr = data.errors.map((err) => {
          return err.msg;
        }, []);
        setFormErrors(mappedErr);
      }
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({'aboutMe': data.aboutMe}),
    });
    if (!response2.ok) {
      throw new Error('Error updating about me');
    };
    console.log(response);
    console.log(response2);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`http://localhost:8080/user/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Error fetching users')
    };
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const updateProfilePic = async (picId) => {
  try {
    const response = await fetch(`http://localhost:8080/user/profilePic/${picId}`, {
      credentials: 'include',
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Error updating profile pic')
    };
    return true;
  } catch (error) {
    console.error(error);
  }
}

export const userLogIn = async (formData) => {
    const logInData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(logInData),
      });
      if (response.status === 401) {
        const data = await response.json();
        return {success: false,
          error: data.message,
        }
      }
      if (!response.ok) {        
        throw new Error("Error logging in");
      }
      return {success: true};      
    } catch (err) {
      return {success: false,
          error: err.message || 'Error logging in',
        }
    }
  }