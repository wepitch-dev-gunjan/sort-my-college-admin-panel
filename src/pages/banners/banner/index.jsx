import { toast } from 'react-toastify';
import './style.scss';
import { MdDelete } from "react-icons/md";
import config from '@/config';
import axios from 'axios';
import { formatDate } from '../../../utilities';
const { backend_url } = config;

const Banner = ({ banner, deleteCallBack }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${backend_url}/admin/home-page-banner/${banner._id}`);
      toast('Banner Deleted Successfully')
      deleteCallBack()
    } catch (error) {
      console.log(error)
      toast("Error Deleteing Banner")
    }
  }
  return (
    <div className='Banner-container'>
      <div onClick={handleDelete} className="delete-button">
        <MdDelete color='white' size='30' />
      </div>
      <img src={banner.url} alt="" />
      <p>{formatDate(banner.createdAt)}</p>
    </div>
  );
};

export default Banner;