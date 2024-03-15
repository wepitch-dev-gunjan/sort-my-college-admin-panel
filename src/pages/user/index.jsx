import { Link } from "react-router-dom";
import "./style.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/config";
const { backend_url } = config;

const User = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/user/users-for-admin`);
      setUsers(data);
    } catch (error) {
      console.error(" error:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <div className="User-container">
      <div className="heading sticky">
        <div className="row">
          <div className="col">
            <h4>PROFILE PIC</h4>
          </div>
          <div className="col">
            <h4>NAME</h4>
          </div>
          <div className="col">
            <h4>EMAIL</h4>
          </div>
          <div className="col">
            <h4>VIEW PROFILE</h4>
          </div>
        </div>
      </div>
      <div className="user-table-container">
        <div className="table">
          {users.map((user, i) => (
            <div className="row" key={i}>
              <div className="col">
                <img src={user.profile_pic} alt="user avatar" />
              </div>
              <div className="col">{user.name}</div>
              <div className="col">{user.email}</div>
              <div className="col">
                <Link to={`/user/user-details/${user._id}`}>
                  <p>View Profile</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
