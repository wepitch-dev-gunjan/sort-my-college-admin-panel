import { useContext } from "react";
import './style.scss';
import { WebinarContext } from "../../../context/WebinarContext";
import { useNavigate } from "react-router-dom";

const AddWebinarButton = () => {
  const { setAddMode } = useContext(WebinarContext);
  const navigate = useNavigate()

  const handleClick = () => {
    setAddMode(prev => !prev);
    navigate('/webinar')
  }

  return (
    <div className='AddWebinarButton-container'>
      <div className='primary-button add-webinar-button'
        onClick={handleClick}
      >
        Add Webinar
      </div>
    </div>
  );
};

export default AddWebinarButton;