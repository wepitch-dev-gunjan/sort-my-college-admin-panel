import { Link } from "react-router-dom";
import "./style.scss"
import { useState } from 'react';


const User = () => {
  const [counsellors, setCounsellors] = useState([
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Verified',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Verified',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Pending',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Rejected',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Rejected',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Pending',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Verified',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Verified',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Verified',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Verified',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Verified',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Verified',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
      status: 'Verified',
      _id: 'fsdf/dfdgfg/f/gf/f/gf/'
    },
  ]);


  return (
    <div className="Payments-container">
      <div className="heading sticky">
        <h1>All COUNSELLORS</h1>
        <div className="row">
          <div className="col"><h4>IMAGE</h4></div>
          <div className="col"><h4>NAME</h4></div>
          <div className="col"><h4>EMAIL</h4></div>
          <div className="col"><h4>STATUS</h4></div>
          <div className="col"><h4>PROFILE LINK</h4></div>
        </div>
      </div>
      <div className='RecentPayments-container'>
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
              <div className='col'>
                <Link to='/counsellors/counsellor-profile'>
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

export default User