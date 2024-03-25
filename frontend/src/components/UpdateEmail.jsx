import { useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UpdateEmail = () => {
  const emailRef = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const updateEmail = async () => {
    try {
      const response = await axios.put("/update-email", {
        id: user._id,
        email: emailRef.current.value,
      });

      alert(response.data);
      emailRef.current.value = "";
      // await signout();
    } catch (error) {
      console.error("Fehler beim Aktualisieren der E-Mail-Adresse:", error);
      alert("Fehler beim Aktualisieren der E-Mail-Adresse.");
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
      <p className="text-center text-lg text-black pb-4">
        Email: {user?.email}
      </p>
      <div>
        <input
          style={{ backgroundColor: "transparent", textAlign: "center" }}
          className="flex-grow p-3 sm:p-2 border mb-4 rounded-md text-white font-bold text-lg"
          type="email"
          placeholder="New Email"
          ref={emailRef}
        />
      </div>
      <button
        style={{
          backgroundColor: "#da2f68",
        }}
        className="px-12 py-3 rounded-lg size-xxl  text-white cursor-pointer text-md"
        onClick={updateEmail}
      >
        UPDATE EMAIL
      </button>
    </div>
  );
};

export default UpdateEmail;
