import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addpic } from "../redux/actions";


const Uploadpic = () => {
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(null);
  const [pic, setPic] = useState("");
  const [title, setTitle] = useState("");
  const id = localStorage.getItem("id");

  const uploadPic = async (file) => {
    try {
      if (
        file &&
        (file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png")
      ) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "amanpanchal");
        data.append("cloud_name", "dk2scs5jz");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dk2scs5jz/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const result = await response.json();
        setPic(result.secure_url);
      } else {
        alert("The selected file is not a valid image type.");
      }
    } catch (e) {
      console.error("Error uploading image:", e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title && pic) {
      const data = { title, pic, id };
      dispatch(addpic(data));
    } else if (!title) {
      alert("Enter image title.");
    } else if (!pic) {
      alert("Submit your pic.");
    } else {
      alert("Add image and title.");
    }
  };

  return (
    <div>
      <div className="inputside">
        <input
          type="text"
          value={title}
          placeholder="Enter image title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setPicture(file);
            uploadPic(file);
          }}
        />
        <br />
        <button className="upload" onClick={onSubmit}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Uploadpic;
