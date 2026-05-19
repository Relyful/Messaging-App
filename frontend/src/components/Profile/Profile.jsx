import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { fetchUserData, updateProfile } from "../../api/userApi";
import { useOutletContext } from "react-router";

export default function Profile() {
  // Fetch stuff from backend based on users id saved in user state
  // Add userData state and keep data there.
  const { user } = useOutletContext();
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(true);

  async function fetchDataHandler(user, controller) {
    if (user) {
      const data = await fetchUserData(user.id, controller);
      setProfileData(data);
      console.log(data);
    }
  };

  async function handleProfileUpdate(formData) {
    const newData = {
      'displayName': formData.get('displayName'),
      'aboutMe': formData.get('aboutMe')
    };
    const profileUpdateStatus = await updateProfile(newData);
    // Edit mode becomes false too fast i guess Fix it
    if (profileUpdateStatus) {
      setProfileData({
        ...profileData,
        'displayName': newData.displayName,
        'about': newData.aboutMe,
      });
    };
    setEditMode(false);
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
        <button type="button" onClick={() => setEditMode(!editMode)}>{editMode ? `Cancel edit` : `Edit profile`}</button>
      </div>
      {profileData ? (
        <div className={styles.profileData}>
          <div className={styles.profilePicture}>
            <div className={styles.profilePicPlaceholder}></div>
          </div>
          <div className={styles.infoContainer}>
            {editMode ? (
              <form action={handleProfileUpdate} className={styles.editForm}>
                <label htmlFor="displayName">Display name: </label>
                <input type="text" name="displayName" id="displayName" defaultValue={profileData.displayName} />
                <label htmlFor="aboutMe">About me: </label>
                <textarea name="aboutMe" id="aboutMe" defaultValue={profileData.about}></textarea>
                <div className={styles.formButtonRow}>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}
