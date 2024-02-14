import React, { useState } from 'react'
import './style.scss'

const UserDetails = () => {
    const [user, setUser] = useState({
          user_name: 'Naman',
          user_image: "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_1280.png",
          user_email: 'abc@gmail.com',
          user_phone: '+91-788785454545',
          user_dob: '2 may 2000',
      })

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
                <p>{user.user_name}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Email </p>
            </div>
            <div className="info-value">
                <p>{user.user_email}</p>           
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
  )
}

export default UserDetails
