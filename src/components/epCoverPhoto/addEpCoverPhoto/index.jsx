// import React, { useState, useRef, useContext, forwardRef } from 'react';
// import AvatarEditor from 'react-avatar-editor';
// import './style.scss';
// import { ProfileContext } from '../../../context/ProfileContext';
// import { IoCloudUploadOutline } from "react-icons/io5";
// import config from '@/config';
// import { AdminContext } from '../../../context/AdminContext';
// import { dataURLtoFile } from '../../../utilities';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// const { backend_url } = config;

// const AddEpCoverPhoto = forwardRef((props, ref) => {
//   const [image, setImage] = useState(null);
//   const [scale, setScale] = useState(1);
//   const editorRef = useRef(null);
//   const fileRef = useRef(null);
//   const { setEpCoverPhotoEditMode, fetchProfile } = useContext(ProfileContext);
//   const { admin } = useContext(AdminContext);

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const fileReader = new FileReader();
//       fileReader.onload = (event) => setImage(event.target.result);
//       fileReader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const handleScaleChange = (event) => {
//     setScale(parseFloat(event.target.value));
//   };

//   const onSave = async () => {
//     if (editorRef.current) {
//       const canvasScaled = editorRef.current.getImageScaledToCanvas();
//       const file = dataURLtoFile(canvasScaled.toDataURL()); // Convert data URL to File object

//       try {
//         const formData = new FormData();
//         formData.append('file', file); // Append the File object to FormData

//         const instituteId = props.instituteId; // Assuming instituteId is passed as a prop

//         await axios.post(`${backend_url}/admin/institutes/${instituteId}/cover-photo`, formData, {
//           headers: {
//             Authorization: admin.token,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         fetchProfile();

//         // Handle success, show message, or perform other actions upon successful upload
//         setEpCoverPhotoEditMode(false);
//         toast('Cover image updated successfully');
//       } catch (error) {
//         // Handle error, show error message, or perform error-related actions
//         setEpCoverPhotoEditMode(false);
//         toast('Error uploading cover image', error);
//       }
//     }
//   };

//   const handleCancel = () => {
//     setEpCoverPhotoEditMode(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       const droppedFile = e.dataTransfer.files[0];
//       const fileReader = new FileReader();
//       fileReader.onload = (event) => setImage(event.target.result);
//       fileReader.readAsDataURL(droppedFile);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   return (
//     <div className='AddProfilePic-container'>
//       {!image &&
//         <div className="drop-area-container">
//           <div
//             ref={ref}
//             className="drop-area"
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onClick={() => fileRef.current.click()}
//           >
//             <IoCloudUploadOutline size='100' />
//             Drag & Drop here
//             <p>or</p>
//             <div className="browse-button">
//               Browse File
//             </div>
//           </div>
//         </div>
//       }
//       <input ref={fileRef} type="file" onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
//       {image && (
//         <>
//           <div className="middle">
//             <div className="avatar-editor-container">
//               <AvatarEditor
//                 ref={editorRef}
//                 image={image}
//                 width={500}
//                 height={500}
//                 border={50}
//                 borderRadius={0} // No border radius for cover photo
//                 color={[255, 255, 255, 0.6]} // RGBA
//                 scale={scale}
//                 rotate={0}
//               />
//               <div className="bottom">
//                 <button onClick={onSave}>Save</button>
//                 <button onClick={handleCancel}>Cancel</button>
//               </div>
//             </div>
//             <input
//               type="range"
//               onChange={handleScaleChange}
//               min="1"
//               max="2"
//               step="0.01"
//               defaultValue="1"
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// });

// export default AddEpCoverPhoto;


import React, { useState, useRef, useContext, forwardRef } from "react";
import AvatarEditor from "react-avatar-editor";
import "./style.scss";
import { ProfileContext } from "../../../context/ProfileContext";
import { IoCloudUploadOutline } from "react-icons/io5";
import config from "@/config";
import { AdminContext } from "../../../context/AdminContext";
import { dataURLtoFile } from "../../../utilities";
import axios from "axios";
import { toast } from "react-toastify";

const { backend_url } = config;

const AddEpCoverPhoto = forwardRef((props, ref) => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);
  const fileRef = useRef(null);
  const { setEpCoverPhotoEditMode, fetchProfile } = useContext(ProfileContext);
  const { admin } = useContext(AdminContext);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => setImage(event.target.result);
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };


  const getInstituteIdFromURL = () => {
     const pathParts = window.location.pathname.split("/");
     // Assuming the URL pattern is something like '/admin/institutes/{instituteId}/cover-photo'
     const instituteId = pathParts.length-1
     console.log(pathParts);
     
     return pathParts[instituteId]; // Extract the instituteId from URL
   };

    const instituteId = getInstituteIdFromURL();
  

  const handleScaleChange = (event) => {
    setScale(parseFloat(event.target.value));
  };

  const onSave = async () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const file = dataURLtoFile(canvasScaled.toDataURL()); // Convert data URL to File object

      if (!instituteId) {
        console.error("Institute ID is missing from the URL!");
        return; // Exit if no institute ID is found
      }

      try {
        const formData = new FormData();
        formData.append("image", file); // Use 'image' as the key to match backend expectation

        await axios.put(
          `${backend_url}/ep/institute/${instituteId}/cover-photo`,
          formData,
          {
            headers: {
              Authorization: admin.token, // Ensure token is prefixed with 'Bearer'
              "Content-Type": "multipart/form-data",
            },
          }
        );

        fetchProfile();

        setEpCoverPhotoEditMode(false);
        toast("Cover image updated successfully");
      } catch (error) {
        setEpCoverPhotoEditMode(false);
        toast("Error uploading cover image");
      }
    }
  };

  const handleCancel = () => {
    setEpCoverPhotoEditMode(false);
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
            ref={ref}
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
                width={500}
                height={500}
                border={50}
                borderRadius={0} // No border radius for cover photo
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

export default AddEpCoverPhoto;
