import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import config from "@/config";
import { useParams } from "react-router-dom";
const { backend_url } = config;

const UserDetails = () => {
  const [user, setUser] = useState({});
  const { user_id } = useParams();

  const getSingleUser = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/user/users-for-admin/${user_id}`
      );
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  getSingleUser();

  return (
    <div className="UserDetails-container">
      <div className="basic-info">
        <div className="user_image">
          <img src={user.user_image} alt="" />
        </div>

        <div className="info">
          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Name </p>
              </div>
              <div className="info-value">
                <p>{user.name}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Email </p>
              </div>
              <div className="info-value">
                <p>{user.email}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Phone Number</p>
              </div>
              <div className="info-value">
                <p>{user.user_phone}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Date of Birth</p>
              </div>
              <div className="info-value">
                <p>{user.user_dob}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
