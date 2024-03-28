import React, { useState, useRef, useContext, forwardRef } from "react";
import AvatarEditor from "react-avatar-editor";
import "./style.scss";
import { IoCloudUploadOutline } from "react-icons/io5";
import config from "@/config";
import { AdminContext } from "../../../context/AdminContext";
import { compressImage, dataURLtoFile } from "../../../utilities";
import axios from "axios";
import { toast } from "react-toastify";
import { BannerContext } from "../../../context/BannerContext";
import useClickOutside from "../../../customHooks/useClickOutside";

const { backend_url } = config;
const AddBanner = forwardRef((props, ref) => {
  const refe = useRef();
  const { setBanners } = useContext(BannerContext);
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);
  const fileRef = useRef(null);
  const { setAddBannerMode } = useContext(BannerContext);
  const { admin } = useContext(AdminContext);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => setImage(event.target.result);
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleScaleChange = (event) => {
    setScale(parseFloat(event.target.value));
  };

  const onSave = async () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const file = dataURLtoFile(canvasScaled.toDataURL()); // Convert data URL to File object

      const compressedImage = await compressImage(file);
      try {
        const formData = new FormData();
        formData.append("banner", compressedImage); // Append the File object to FormData

        const { data } = await axios.post(
          `${backend_url}/admin/home-page-banner`,
          formData,
          {
            headers: {
              Authorization: admin.token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle success, show message, or perform other actions upon successful upload
        setAddBannerMode(false);
        setBanners((prev) => [...prev, data]);
        toast("Image updated successfully");
      } catch (error) {
        // Handle error, show error message, or perform error-related actions
        setAddBannerMode(false);
        toast("Error uploading image:", error);
      }
    }
  };
  useClickOutside(refe, () => handleCancel());

  const handleCancel = () => {
    setAddBannerMode(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (event) => setImage(event.target.result);
      fileReader.readAsDataURL(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="AddProfilePic-container">
      {!image && (
        <div className="drop-area-container">
          <div
            ref={refe}
            className="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileRef.current.click()}
          >
            <IoCloudUploadOutline size="100" />
            Drag & Drop here
            <p>or</p>
            <div className="browse-button">Browse File</div>
          </div>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      {image && (
        <>
          <div className="middle">
            <div className="avatar-editor-container">
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={780}
                height={240}
                border={50}
                borderRadius={0} // Half of width and height to create a circle
                color={[255, 255, 255, 0.6]} // RGBA
                scale={scale}
                rotate={0}
              />
              <div className="bottom">
                <button onClick={onSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
            <input
              type="range"
              onChange={handleScaleChange}
              min="1"
              max="2"
              step="0.01"
              defaultValue="1"
            />
          </div>
        </>
      )}
    </div>
  );
});

export default AddBanner;
