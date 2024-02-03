import { ZoomMtg } from "@zoom/meetingsdk";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { backend_url } from "../../config";

const Meeting = () => {
  const { admin } = useContext(AdminContext)


  var authEndpoint = `${backend_url}/admin/webinar/generate-signature`
  var sdkKey = ''
  var meetingNumber = '123456789'
  var passWord = ''
  var role = 0
  var userName = 'React'
  var userEmail = ''
  var registrantToken = ''
  var zakToken = ''
  var leaveUrl = 'http://localhost:3000'

  function getSignature(e) {

    e.preventDefault();

    fetch(authEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AdminContext.token
      },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
      .then(response => {
        startMeeting(response.signature)
      }).catch(error => {
        console.error(error)
      })
  }

  function startMeeting(signature) {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  return (
    <div>
      <h1>Zoom Meeting SDK Sample React</h1>
      <button onClick={getSignature}>Join Meeting</button>
      <div id='zmmtg-root'></div>
    </div>
  )
}

export default Meeting;