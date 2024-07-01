import "./style.scss";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { AccommodationContext } from "../../context/AccommodationContext";
import { Link, useParams } from "react-router-dom";
import pg_1 from "../../assets/pg-1.jpg";
import pg_2 from "../../assets/pg-2.jpg";
import pg_3 from "../../assets/pg-3.jpg";
import pg_4 from "../../assets/pg-4.jpg";
import pg_5 from "../../assets/pg-5.jpg";
import config from "@/config";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
const { backend_url } = config;
const Accommodation = () => {
  const [accommodations, setAccommodations] = useState([]);
  const { accommoadtion_id } = useParams();
  const { admin } = useContext(AdminContext);
  // const pgs = [
  //   {
  //     name: "Ram Niwas PG",
  //     image: [pg_1, pg_2, pg_3, pg_4, pg_5],
  //     location: "Ram Bagh Circle, Jaipur",
  //     rating: "4.2",
  //     no_of_reviews: "8",
  //     lowest_price: "6000",
  //   },
  //   {
  //     name: "Shaym Niwas PG",
  //     image: [pg_4, pg_5, pg_2, pg_1, pg_3],
  //     location: "Ram Bagh Circle, Jaipur",
  //     rating: "4.4",
  //     no_of_reviews: "4",
  //     lowest_price: "8000",
  //   },
  //   {
  //     name: "Ram Niwas PG",
  //     image: [pg_3, pg_1, pg_5, pg_2],
  //     location: "Ram Bagh Circle, Jaipur",
  //     rating: "4.1",
  //     no_of_reviews: "10",
  //     lowest_price: "12000",
  //   },
  //   {
  //     name: "Shaym Niwas PG",
  //     image: [pg_5, pg_4, pg_1, pg_2],
  //     location: "Ram Bagh Circle, Jaipur",
  //     rating: "4.5",
  //     no_of_reviews: "4",
  //     lowest_price: "17999",
  //   },
  // ];
  // const array_of_images = [pg_1, pg_2, pg_3, pg_4, pg_5];
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addAccommodationEnable, setAddAccommodationEnable } =
    useContext(AccommodationContext);

  const getAccommodations = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/admin/accommodation`, {
        headers: {
          Authorization: admin.token,
        },
      });
      console.log("Accommodations ", data);
      setAccommodations(data);
    } catch (error) {
      console.log("error getting accommodation", error);
    }
  };
  useEffect(() => {
    getAccommodations();
  }, []);

  const getLowestPrice = useCallback((index) => {
    const allPrices = [];
    console.log("Reached", accommodations[index].rooms);

    if (accommodations[index] && accommodations[index].rooms) {
      const accRooms = accommodations[index].rooms;
      accRooms.forEach((accRoom) => {
        if (accRoom.monthly_charge) {
          console.log("Monthly Charge: ", accRoom.monthly_charge);
          allPrices.push(accRoom.monthly_charge);
        }
      });
      console.log("All Prices", allPrices);
    } else {
      console.log('Rooms not found in the selected accommodation.');
    }

    const lowestPrice = allPrices.length > 0 ? Math.min(...allPrices) : null;
    console.log("LOWEEEEST", lowestPrice);
    return lowestPrice;
  }, [accommodations]);

  useEffect(() => {
    if (accommodations.length > 0) {
      getLowestPrice(0);
    }
  }, [accommodations, getLowestPrice]);
 
  return (
    <div className="accommodation-main">
      <div className="accomm-heading">
        <h1>Accommodation</h1>
        <div className="accomm-buttons">
          <Link to="/accommodation/add">
            <button>Queries</button>
          </Link>
          <Link to="/accommodation/add">
            <button>Add New</button>
          </Link>
        </div>
      </div>
      <div className="accomm-parent">
        {accommodations.map((accommodation, i) => (
          <div className="accomm-children">
            <div className="accomm-gallery">
              <div className="accomm-image-container">
                <img src={accommodation.images[0]} alt="Images" />
              </div>
            </div>
            <div className="accomm-child-1">
              <div className="accomm-child-1-l">
                <h4>{accommodation.name}</h4>
                <p>
                  {accommodation.address.area}, 
                  {accommodation.address.city} , {accommodation.address.state}
                </p>
              </div>
              <div className="accomm-child-1-r">
                <p>
                  <FaStar /> {accommodation.rating} | (
                  {accommodation.no_of_reviews}) Reviews
                </p>
              </div>
            </div>
            <div className="accomm-child-2">
              <div className="accomm-child-2-l">
                <p>Starting from</p>
                <p>
                  {" "}
                  <span>{getLowestPrice(i)} INR</span>/Month
                </p>
              </div>
              <div className="accomm-child-2-r">
                <Link to={`/accommodation/details/${accommodation._id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;
