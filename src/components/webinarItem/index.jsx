import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { CiMenuKebab } from 'react-icons/ci';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import "./style.scss";
import { MdDateRange } from "react-icons/md";
import { AdminContext } from '../../context/AdminContext';
import { backend_url } from '../../config';
import useClickOutside from '../../customHooks/useClickOutside';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { Divider } from '@mui/material';

const WebinarCard = ({ webinar, setWebinars, getResponse }) => {
  const menuRef = useRef(null)
  const { admin } = useContext(AdminContext);
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [webinarDetails, setWebinarDetails] = useState(webinar);

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  const formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  const goodDateFormat = (inputDate) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const [year, month, day] = inputDate.split('-');
    const monthIndex = parseInt(month, 10) - 1;

    return `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
  }

  const handleSave = async () => {
    try {
      const response = await axios.put(`${backend_url}/webinars/${webinarDetails._id}`, webinarDetails, {
        headers: {
          Authorization: admin.token
        }
      });
      console.log('Webinar updated successfully', response.data);
      setEditMode(false);
      setWebinars(prev => prev.map(item => (item._id === webinarDetails._id ? item : response.data.webinar)));
      // Perform any state updates or re-fetch the webinar list as needed

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleCancel = () => {
    setWebinarDetails(webinar);
    setEditMode(false);
  };

  const handleJoinNow = () => {
    if (webinar.webinar_link) {
      window.open(webinar.webinar_link, '_blank');
    }
  };

  const handleDelete = async () => {
    try {
      // Send an axios request to the server to delete the webinar
      const { data } = await axios.delete(`${backend_url}/counsellor/webinars/${webinar._id}`, {
        headers: {
          Authorization: admin.token
        }
      });
      toast(data.message);
      getResponse();
    } catch (error) {
      toast(error.message);
      console.error('An error occurred:', error);
    }
  };

  console.log(webinarDetails.webinar_thumbnail)
  return (
    <div className="WebinarCard-container">
      {/* {<div ref={menuRef} className={`${showMenu && 'display-active'} drop-down-menu`}>
        <div onClick={() => setEditMode(true)} className="menu-item">
          <AiOutlineEdit />
          <span>Edit</span>
        </div>
        <div onClick={handleDelete} className="menu-item">
          <AiOutlineDelete />
          <span>Delete</span>
        </div>
      </div>} */}
      {editMode ? (
        <div className="edit-mode-container">
          <tr>
            <td>Date:</td>
            <td>
              <input
                type="date"
                value={webinarDetails.webinar_date}
                onChange={(e) => setWebinarDetails({ ...webinarDetails, webinar_date: formatDate(e.target.value) })}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Time:</td>
            <td>
              <input
                type="time"
                value={webinarDetails.webinar_time}
                onChange={(e) => setWebinarDetails({ ...webinarDetails, webinar_time: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>Fees:</td>
            <td>
              <input
                type="number"
                value={webinarDetails.webinar_fee}
                onChange={(e) => setWebinarDetails({ ...webinarDetails, webinar_fee: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>Available Slots:</td>
            <td>
              <input
                type="number"
                value={webinarDetails.webinar_available_slots}
                onChange={(e) => setWebinarDetails({ ...webinarDetails, webinar_available_slots: e.target.value })}
              />
            </td>
          </tr>
          <div className="edit-mode-bottom">
            <button onClick={handleSave} type="submit">
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className='webinar-container'>
          <div className="webinar-top">
            <img src={webinarDetails.webinar_thumbnail} alt="this is an image of webinar" />
          </div>
          <div className="webinar-mid">
            <h2>{webinarDetails.webinar_title}</h2>
            <div className='row'>
              <div className="col date"><MdDateRange /></div>
              <div className='col date'>{goodDateFormat(formatDate(webinar.webinar_date))}</div>
            </div>
            <div className='row'>
              <div className='col'>{webinar.webinar_time}</div>
            </div>
            <div className='row'>
              <div className='col'>{webinar.webinar_fee}</div>
              <span>₹</span>
            </div>
            <div className='row'>
              <div className='col'>{webinar.webinar_available_slots}</div>
            </div>
          </div>
          <Divider />
          <div className="webinar-bottom">
            <div className='button' onClick={handleJoinNow}>Join Now</div>
            <div className='button' onClick={handleJoinNow}>View detials</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebinarCard;