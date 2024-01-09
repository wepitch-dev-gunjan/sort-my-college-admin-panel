import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { CiMenuKebab } from 'react-icons/ci';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import "./style.scss";
import { AdminContext } from '../../context/AdminContext';
import { backend_url } from '../../config';
import useClickOutside from '../../customHooks/useClickOutside';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

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

  const handleSave = async () => {
    try {
      const response = await axios.put(`${backend_url}/counsellor/webinars/${webinarDetails._id}`, webinarDetails, {
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

  return (
    <div className="webinar-item">

      {<div ref={menuRef} className={`${showMenu && 'display-active'} drop-down-menu`}>
        <div onClick={() => setEditMode(true)} className="menu-item">
          <AiOutlineEdit />
          <span>Edit</span>
        </div>
        <div onClick={handleDelete} className="menu-item">
          <AiOutlineDelete />
          <span>Delete</span>
        </div>
      </div>}

      {editMode ? (
        <form className='edit-mode-form' onSubmit={handleSave}>
          <table className='edit-mode-table'>
            <tbody>
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
            </tbody>
          </table>
          <div className="edit-mode-bottom">
            <button onClick={handleSave} type="submit">
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <table className="display-mode-table">
            <tbody>
              <tr>
                <td>Date:</td>
                <td>{formatDate(webinar.webinar_date)}</td>
              </tr>
              <tr>
                <td>Time:</td>
                <td>{webinar.webinar_time}</td>
              </tr>
              <tr>
                <td>Fee:</td>
                <td>{webinar.webinar_fee}</td>
              </tr>
              <tr>
                <td>Available Slots:</td>
                <td>{webinar.webinar_available_slots}</td>
              </tr>
            </tbody>
          </table>
          <div className="bottom">
            <button onClick={handleJoinNow}>Join Now</button>
          </div>
        </>
      )}
    </div>
  );
};

export default WebinarCard;