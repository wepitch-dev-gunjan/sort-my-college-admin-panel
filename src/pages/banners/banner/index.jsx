import { toast } from "react-toastify";
import "./style.scss";
import { MdDelete } from "react-icons/md";
import config from "@/config";
import axios from "axios";
import { formatDate } from "../../../utilities";
import { useState } from "react";
import Spinner from "../../../components/spinner/Index";
const { backend_url } = config;

const Banner = ({ banner, deleteCallBack }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading((prev) => !prev);
      await axios.delete(`${backend_url}/admin/home-page-banner/${banner._id}`);
      setLoading((prev) => !prev);
      toast("Banner Deleted Successfully");
      deleteCallBack();
    } catch (error) {
      setLoading((prev) => !prev);

      console.log(error);
      toast("Error Deleteing Banner");
    }
  };
  return (
    <div className="Banner-container">
      <div onClick={handleDelete} className="delete-button">
        {loading ? <Spinner /> : <MdDelete color="white" size="30" />}
      </div>
      <img src={banner.url} alt="" />
      <p>{formatDate(banner.createdAt)}</p>
    </div>
  );
};

export default Banner;
