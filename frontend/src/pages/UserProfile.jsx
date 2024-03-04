import { useContext, useEffect } from "react";
import ProfileTabsAnimation from "../components/ProfileTabsAnimation";
import { UserContext } from "../context/UserContext";

function UserProfile() {
  const { user } = useContext(UserContext);
  useEffect(() => {}, [user]);
  return <ProfileTabsAnimation />;
}

export default UserProfile;
