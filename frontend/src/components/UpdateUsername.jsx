import { useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UpdateUsername = () => {
  const newUsernameRef = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const updateUsername = async () => {
    try {
      const response = await axios.put("/update-username", {
        id: user._id,

        username: newUsernameRef.current.value,
      });

      alert(response.data);
      console.log();

      newUsernameRef.current.value = "";
      await signout();
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Benutzernamens:", error);
      alert("Fehler beim Aktualisieren des Benutzernamens.");
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
          style={{
            backgroundColor: "transparent",
            textAlign: "center",
            color: "white",
          }}
          className="flex-grow p-3 sm:p-2 border rounded-md font-bold text-lg"
          type="text"
          placeholder="New Username"
          ref={newUsernameRef}
        />
      </div>
      <button
        className="px-8 py-3 rounded-lg size-xxl bg-pink-900  text-white cursor-pointer text-lg"
        onClick={updateUsername}
      >
        UPDATE USERNAME
      </button>
    </div>
  );
};

export default UpdateUsername;
