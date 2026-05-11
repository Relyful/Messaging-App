import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { fetchUserData } from "../../api/userApi";
import { useOutletContext } from "react-router";

export default function Profile() {
  // Fetch stuff from backend based on users id saved in user state
  // Add userData state and keep data there.
  const { user } = useOutletContext();
  const [profileData, setProfileData] = useState(null);

  async function fetchDataHandler(user, controller) {
    if (user) {
      const data = await fetchUserData(user.id, controller);
      setProfileData(data);
      console.log(data);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchDataHandler(user, controller);
    return () => controller.abort();
  }, [user]);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h2>User profile</h2>
        <button type="button">Edit profile</button>
      </div>
      {profileData ? (
        <div className={styles.profileData}>
          <div className={styles.profilePicture}><div className={styles.profilePicPlaceholder}></div></div>
          <div className={styles.infoContainer}>
            <div className={styles.displayName}>
              Display name:{" "}
              {profileData.displayName
                ? `${profileData.displayName}`
                : `Not set`}
            </div>
            <div className={styles.aboutMe}>
              About me:{" "}
              {profileData.about ? `${profileData.about}` : `No info yet`}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}
