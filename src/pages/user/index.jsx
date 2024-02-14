import { Link } from "react-router-dom";
import "./style.scss"
import { useState } from 'react';

const User = () => {
  const [users, setUsers] = useState([
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
    {
      profile_pic: 'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
      name: 'XYZ',
      email: 'DEMO@GMAIL.COM ',
    },
  ]);

  return (
    <div className="User-container">
      <div className="heading sticky">
        <div className="row">
          <div className="col"><h4>PROFILE PIC</h4></div>
          <div className="col"><h4>NAME</h4></div>
          <div className="col"><h4>EMAIL</h4></div>
          <div className="col"><h4>VIEW PROFILE</h4></div>
        </div>
      </div>
      <div className='user-table-container'>
        <div className="table">
          {users.map((user, i) => (
            <div className='row' key={i}>
              <div className="col">
                <img src={user.profile_pic} alt="user avatar" />
              </div>
              <div className='col'>{user.name}</div>
              <div className='col'>{user.email}</div>
              <div className='col'>
              <Link to='/user/user-details'>

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