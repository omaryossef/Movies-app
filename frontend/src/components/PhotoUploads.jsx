import React, { useContext, useState } from "react";
import { UploadContext } from "../context/UploadContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useEffect } from "react";
export const PhotoUpload = ({ onImageUpload }) => {
  const { photo, setPhoto } = useContext(UploadContext);
  const { user } = useContext(UserContext);
  function convertToBase64(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPhoto(reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  }
  async function uploadImage() {
    console.time("Upload");
    if (photo !== "") {
      const imageData = JSON.stringify({ base64: photo });
      console.log("USERID FROM PHOTOUPLOAD", user._id);
      try {
        const response = await axios.post(
          `http://localhost:3000/upload/${user._id}`,
          imageData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("Image uploaded successfully");
        onImageUpload();
        console.timeEnd("Upload");
        setPhoto("");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("Image data missing.");
    }
  }
  async function deleteImage() {
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete/${user._id}`
      );
      console.log(response.data);
      alert("Image deleted successfully");
      onImageUpload();
    } catch (error) {
      console.log(error);
    }
  }
  const cancel = () => {
    setPhoto("");
  };
  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <input
          className=" p-3 sm:p-2 border rounded-md"
          accept="image/*"
          type="file"
          onChange={convertToBase64}
        />
        {photo && (
          <img
            src={photo}
            width={200}
            height={200}
            style={{ borderRadius: "10px" }}
            alt=""
          />
        )}
        <button
          className="flex justify-center gap-1 px-24 py-3 rounded-lg size-xxl bg-pink-900 text-white cursor-pointer"
          onClick={uploadImage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
            />
          </svg>
          UPLOAD
        </button>
        <button
          className="flex justify-center gap-2 px-24 py-3 rounded-lg size-xxl bg-pink-900 text-white cursor-pointer"
          onClick={deleteImage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
            />
          </svg>
          DELETE
        </button>
        <button
          className="flex justify-center gap-1 px-24 py-3 rounded-lg size-xxl bg-pink-900 text-white cursor-pointer"
          onClick={cancel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
          CANCEL
        </button>
      </div>
    </>
  );
};
