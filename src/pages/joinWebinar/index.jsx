// import { useParams } from 'react-router-dom';
import './style.scss'
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { backend_url } from '../../config';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

const JoinWebinar = () => {
  // const { webinar_id } = useParams();
  const { admin } = useContext(AdminContext);

  const client = ZoomMtgEmbedded.createClient();

  const startZoomMeeting = async (e) => {
    var authEndpoint = ''
    var sdkKey = 'splqFa5rT6OuIYV0YRTcxg'
    var meetingNumber = '123456789'
    var passWord = ''
    var role = 0
    var userName = 'React'
    var userEmail = ''
    var registrantToken = ''
    var zakToken = ''
    var leaveUrl = 'http://localhost:3000'

    const startMeeting = async (signature) => {
      try {
        let meetingSDKElement = document.getElementById('meetingSDKElement');
        client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true }).then(() => {
          client.join({
            signature: signature,
            sdkKey: sdkKey,
            meetingNumber: meetingNumber,
            password: passWord,
            userName: userName,
            userEmail: userEmail,
            tk: registrantToken,
            zak: zakToken
          }).then(() => {
            console.log('joined successfully')
          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
        })
      } catch (error) {
        throw new Error(error.message)
      }
    }
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${backend_url}/admin/webinar/generate-signature`, // Corrected the template string
        {
          meeting_number: '123456',
          role: 0
        },
        {
          headers: {
            Authorization: admin.token
          },
        }
      );

      console.log(data.signature);
      await startMeeting(data.signature)

    } catch (error) {
      console.log("error starting zoom meeting" + error);
      toast("Error starting zoom meeting");
    }
  };


  return (
    <div className='JoinWebinar-container'>
      JoinWebinar
      <button onClick={(e) => startZoomMeeting(e)} >Start Meeting</button>
      <div id="meetingSDKElement">

      </div>
    </div>
  );
};

export default JoinWebinar;