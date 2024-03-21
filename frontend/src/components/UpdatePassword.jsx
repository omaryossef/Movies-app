import { useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const updatePassword = async () => {
    try {
      const response = await axios.put("/update-password", {
        id: user._id,
        password: currentPasswordRef.current.value,
        newPassword: newPasswordRef.current.value,
      });

      alert(response.data);
      currentPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
      await signout();
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Passworts:", error);
      alert("Fehler beim Aktualisieren des Passworts.");
    }
  };

  async function signout() {
    const { data } = await axios.post("/signout");
    if (data) {
      alert("You have signed out");
      navigate("/");
      setUser("");
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div>
        <input
          style={{ backgroundColor: "transparent", textAlign: "center" }}
          className="flex-grow p-3 sm:p-2 border rounded-md text-white font-bold text-lg"
          type="password"
          placeholder="Current Password"
          ref={currentPasswordRef}
        />
      </div>
      <div>
        <input
          style={{ backgroundColor: "transparent", textAlign: "center" }}
          className="flex-grow p-3 sm:p-2 border rounded-md text-white font-bold text-lg"
          type="password"
          placeholder="New Password"
          ref={newPasswordRef}
        />
      </div>
      <button
        className="px-8 py-3 rounded-lg size-xxl bg-pink-900 text-white cursor-pointer text-lg"
        onClick={updatePassword}
      >
        UPDATE PASSWORD
      </button>
    </div>
  );
};

export default UpdatePassword;
