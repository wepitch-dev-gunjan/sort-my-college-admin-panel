import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.scss'

const PaymentDetails = () => {

    const navigate = useNavigate();

    const handleBackClick = () => {
        // Navigate back to the payment page or the previous route
        navigate('/payment'); // Replace '/payment' with the actual path you want to go back to
      };

    const [session, setSession] = useState({
        session_counsellor: 'abc',
          session_user: 'xyz',
          session_date: '12-8-2023',
          session_time: '12:00pm',
          session_duration: '60 min',
          session_type: ['Personal', 'Group'],
          session_fee: '500',
          session_status: ['Cancelled', 'Attended', 'NotAttended', 'Rescheduled', 'Booked', 'Available'],
          session_slots: '50',
          session_available_slots: '5',
      })

  return (
    <div className="PaymentDetails-container">
      <div className="basic-info">
      <div className="heading">
         <h2>Session Details</h2>
      </div>     

      <div className="info">
      <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Counsellor name </p>
            </div>
            <div className="info-value">
                <p>{session.session_counsellor}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>User name </p>
            </div>
            <div className="info-value">
                <p>{session.session_user}</p>           
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Date of session</p>
            </div>
            <div className="info-value">
                <p>{session.session_date}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Session Time</p>
            </div>
            <div className="info-value">   
            <p>{session.session_time}</p>             
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Session Duration</p>
            </div>
            <div className="info-value">   
            <p>{session.session_duration}</p>             
            </div>
          </div>
        </div>

        <div className="row">
            <div className="col">
                 <div className="info-field">
                     <p>Session Type</p>
                 </div>
        <div className="info-value">
        {session.session_type?.map((type, i) => (
        <p key={i}>{`${type}${i < session.session_type.length - 1 ? "," : ""}`}</p>
      ))}
    </div>
  </div>
</div>

<div className="row">
          <div className="col">
            <div className="info-field">
              <p>Session Fee</p>
            </div>
            <div className="info-value">   
            <p>{session.session_fee}</p>             
            </div>
          </div>
        </div>

        <div className="row">
            <div className="col">
                 <div className="info-field">
                     <p>Session Status </p>
                 </div>
        <div className="info-value">
        {session.session_status?.map((status, i) => (
        <p key={i}>{`${status}${i < session.session_status.length - 1 ? "," : ""}`}</p>
      ))}
    </div>
  </div>
</div>

<div className="row">
          <div className="col">
            <div className="info-field">
              <p>Session Slots</p>
            </div>
            <div className="info-value">   
            <p>{session.session_slots}</p>             
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Session Available Slots</p>
            </div>
            <div className="info-value">   
            <p>{session.session_available_slots}</p>             
            </div>
          </div>
        </div>

        <div className="button-back">
            <button onClick={handleBackClick}>Back</button>
        </div>
        </div>
      </div>
      </div>
  )
}

export default PaymentDetails
