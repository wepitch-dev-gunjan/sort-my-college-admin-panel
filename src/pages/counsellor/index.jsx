import { Link } from "react-router-dom";
import "./style.scss"
import { useContext, useEffect } from 'react';
import { CounsellorContext } from "../../context/CounsellorContext";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { backend_url } from "../../config";

const Counsellor = () => {

  const updateCounsellorStatus = (counsellorId, newStatus) => {
    // Find the counsellor in the state and update its status
    setCounsellors((prevCounsellors) => {
      return prevCounsellors.map((counsellor) =>
        counsellor._id === counsellorId ? { ...counsellor, status: newStatus } : counsellor
      );
    });
  };
  const { admin } = useContext(AdminContext)


  const getCounsellors = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/counsellor/counsellor-for-admin`,
        // null,
        {
          headers: {
            Authorization: admin.token
          }
        }
      )
      console.log(data)
      setCounsellors(data);
    } catch (error) {
      console.log(error);
      // toast(error.message)
    }
  }
  useEffect(() => {
    if (admin.token)
      getCounsellors()
  }, [admin])
  const { counsellors, setCounsellors } = useContext(CounsellorContext);
  return (
    <div className="Counsellors-container">
      <div className="heading sticky">
        <div className="row">
          <div className="col"><h4>IMAGE</h4></div>
          <div className="col"><h4>NAME</h4></div>
          <div className="col"><h4>EMAIL</h4></div>
          <div className="col"><h4>STATUS</h4></div>
          <div className="col"><h4>OUTSTANDING BALANCE</h4></div>
          <div className="col"><h4>PROFILE LINK</h4></div>
        </div>
      </div>
      <div className='counsellor-container'>
        <div className="table">
          {counsellors.map((counsellor, i) => (
            <div className='row' key={i}>
              <div className="col">
                <img src={counsellor.profile_pic} alt="user avatar" />
              </div>
              <div className='col'>{counsellor.name}</div>
              <div className='col'>{counsellor.email}</div>
              <div className={`col ${counsellor.status === 'Rejected' ? 'red' :
                counsellor.status === 'Verified' ? 'green' :
                  counsellor.status === 'Pending' ? 'blue' : ''
                }`}>{counsellor.status}</div>
              <div className='col'>{counsellor.balance}</div>
              <div className='col'>
                <Link to={`/counsellors/counsellor-profile/${counsellor._id}`}>
                  <p>View Profile</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Counsellor