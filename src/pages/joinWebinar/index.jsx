// import { useParams } from 'react-router-dom';
import './style.scss';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import config from '@/config';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';
import { Helmet } from 'react-helmet';
const { backend_url } = config;

const JoinWebinar = ({ meetingNumber, passWord }) => {
  const { admin } = useContext(AdminContext);
  let sdkKey = 'splqFa5rT6OuIYV0YRTcxg';
  let role = 0;
  let userName = 'React';
  let userEmail = admin.email;
  let registrantToken = '';
  let zakToken = '';
  let leaveUrl = 'http://localhost:3000';

  const client = ZoomMtgEmbedded.createClient();

  const startMeeting = async (signature) => {
    try {
      let meetingSDKElement = document.getElementById('meetingSDKElement');
      // Initialize the Zoom client before using it
      client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true }).then(() => {
        // Now, you can use the client object to join the meeting
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
          console.log('joined successfully');
        }).catch((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const startZoomMeeting = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${backend_url}/admin/webinar/generate-signature`,
        {
          meeting_number: meetingNumber,
          role: 0
        },
        {
          headers: {
            Authorization: admin.token,
            'Content-Type': 'application/json'
          },
        }
      );

      console.log(data.signature);
      // Corrected function call
      await startMeeting(data.signature);

    } catch (error) {
      console.log("error starting zoom meeting" + error);
      toast("Error starting zoom meeting");
    }
  };

  return (
    <div className='JoinWebinar-container'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Your App Title</title>
      </Helmet>
      JoinWebinar
      <button onClick={(e) => startZoomMeeting(e)} >Start Meeting</button>
      <div className='meeting' id="meetingSDKElement"></div>
    </div>
  );
};

export default JoinWebinar;
