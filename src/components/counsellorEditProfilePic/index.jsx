import React, { useState, useRef, useContext, forwardRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import './style.scss';
import { ProfileContext } from '../../context/ProfileContext';
import { IoCloudUploadOutline } from "react-icons/io5";
import config from '@/config';
import { AdminContext } from '../../context/AdminContext';
import { dataURLtoFile } from '../../utilities';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../spinner/Index';
const { backend_url } = config;

const AddCounsellorProfilePic = forwardRef((props, ref) => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);
  const fileRef = useRef(null);
  const { setCounsellorProfilePicEditMode, fetchProfile } = useContext(ProfileContext);
  const { admin } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);

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

  const getCounsellorIdFromUrl = () => {
    const urlParts = window.location.pathname.split('/');
    const idIndex = urlParts[urlParts.length - 1]; // Assuming 'admin' precedes the id in the URL
    return idIndex;
  };

  const counsellor_id = getCounsellorIdFromUrl();
  console.log(counsellor_id);

  const onSave = async () => {
    if (editorRef.current) {
      setLoading(true);
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const file = dataURLtoFile(canvasScaled.toDataURL()); // Convert data URL to File object

      try {
        const formData = new FormData();
        formData.append('image', file); // Append the File object to FormData

        await axios.put(`${backend_url}/counsellor/edit-Profile-Pic/admin/${counsellor_id}`, formData, {
          headers: {
            Authorization: admin.token,
            'Content-Type': 'multipart/form-data',
          },
        });
        await fetchProfile();

        // Handle success, show message, or perform other actions upon successful upload
        setCounsellorProfilePicEditMode(false);
        toast('Image updated successfully');
        setLoading(false);
      } catch (error) {
        // Handle error, show error message, or perform error-related actions
        setCounsellorProfilePicEditMode(false);
        toast('Error uploading image::', error);
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
   setCounsellorProfilePicEditMode(false);
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
    <div className='AddProfilePic-container'>
      {!image && (
        <div className="drop-area-container">
          <div
            ref={ref}
            className="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileRef.current.click()}
          >
            <IoCloudUploadOutline size='100' />
            Drag & Drop here
            <p>or</p>
            <div className="browse-button">
              Browse File
            </div>
          </div>
        </div>
      )}
      <input ref={fileRef} type="file" onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
      {image && (
        <>
          <div className="middle">
            <div className="avatar-editor-container">
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={500}
                height={500}
                border={50}
                borderRadius={250} // Half of width and height to create a circle
                color={[255, 255, 255, 0.6]} // RGBA
                scale={scale}
                rotate={0}
              />
              <div className="bottom">
                <button onClick={onSave}> 
                  {loading ? <Spinner /> : "Save"}
                </button>
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

export default AddCounsellorProfilePic;
