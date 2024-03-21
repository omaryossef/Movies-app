import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UploadContext = createContext();

export const UploadContextProvider = ({ children }) => {
  const [photo, setPhoto] = useState("");
  const [images, setImages] = useState("");

  return (
    <UploadContext.Provider value={{ photo, setPhoto, images, setImages }}>
      {children}
    </UploadContext.Provider>
  );
};
