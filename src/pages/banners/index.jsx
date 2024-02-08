import { toast } from 'react-toastify';
import './style.scss';
import { backend_url } from '../../config';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Banner from './banner';
import AddBannerButton from './addBannerButton';
import { BannerContext } from '../../context/BannerContext';

const Banners = () => {
  const { banners, setBanners, setAddBannerMode } = useContext(BannerContext);

  const getBanners = async () => {
    try {
      const response = await axios.get(`${backend_url}/admin/home-page-banner`);
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error("Failed to fetch banners. Please try again later."); // Adjusted toast message
    }
  }

  useEffect(() => {
    getBanners();
  }, [banners]); // Added missing dependency array

  const deleteBanner = (bannerId) => {
    setBanners(prevBanners => prevBanners.filter(banner => banner._id !== bannerId));
  }

  return (
    <div className="Banners-container">
      <div className="add-banner-button-container">
        <AddBannerButton onClick={() => setAddBannerMode(true)} />
      </div>
      <div className="banners-container-main">
        {banners.map(banner => (
          <Banner
            key={banner._id}
            banner={banner}
            deleteCallBack={() => deleteBanner(banner._id)} // Fixed delete callback
          />
        ))}
      </div>
    </div>
  )
}

export default Banners;
