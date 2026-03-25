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
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };