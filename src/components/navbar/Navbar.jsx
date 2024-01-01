import "./navbar.scss"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HelpIcon from '@mui/icons-material/Help';
import profile from './profile.png'
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        Hello <span className="UserName">Sandeep</span>
      </div>
      <div className="LeftItems">
        <div className="item">
        <DarkModeIcon className="navIcon"/>
        </div>
        <div className="item">
        <HelpIcon className="navIcon"/>
        </div>
        <div className="item">
        <img className="profile" src={profile} alt="test"  />
        </div>
      </div>
    </div>
  )
}

export default Navbar