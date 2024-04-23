import "./style.scss";
import React, { useState, useEffect, useContext } from 'react';
import { FaStar } from "react-icons/fa";
import { AccommodationContext } from "../../context/AccommodationContext";
import { Link } from 'react-router-dom';
import pg_1 from '../../assets/pg-1.jpg';
import pg_2 from '../../assets/pg-2.jpg';
import pg_3 from '../../assets/pg-3.jpg';
import pg_4 from '../../assets/pg-4.jpg';
import pg_5 from '../../assets/pg-5.jpg';


const Accommodation = () => {
    const pgs = [
        {
            "name": "Ram Niwas PG",
            "image" : [pg_1, pg_2, pg_3, pg_4, pg_5],
            "location" : "Ram Bagh Circle, Jaipur",
            "rating" : "4.2",
            "no_of_reviews" : "8",
            "lowest_price" : "6000",
        },
        {
            "name": "Shaym Niwas PG",
            "image": [pg_4, pg_5, pg_2, pg_1, pg_3],
            "location" : "Ram Bagh Circle, Jaipur",
            "rating" : "4.4",
            "no_of_reviews" : "4",
            "lowest_price" : "8000",
        },
        {
            "name": "Ram Niwas PG",
            "image" : [pg_3, pg_1, pg_5, pg_2],
            "location" : "Ram Bagh Circle, Jaipur",
            "rating" : "4.1",
            "no_of_reviews" : "10",
            "lowest_price" : "12000",
        },
        {
            "name": "Shaym Niwas PG",
            "image": [pg_5, pg_4, pg_1, pg_2],
            "location" : "Ram Bagh Circle, Jaipur",
            "rating" : "4.5",
            "no_of_reviews" : "4",
            "lowest_price" : "17999",
        },
    ]
    const array_of_images = [pg_1, pg_2, pg_3, pg_4, pg_5]
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addAccommodationEnable , setAddAccommodationEnable } = useContext(AccommodationContext)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pgs.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    

    return(
        <div className="accommodation-main" >
            <div className="accomm-heading">
                <h1>Accommodation</h1>
                <Link to="/accommodation/add">
                    <button>Add New</button>
                </Link>
            </div>
            <div className="accomm-parent">
                {pgs.map((pg, i) => (
                    <div className="accomm-children">
                       <div className="accomm-gallery">
                            <div className="accomm-image-container">
                                <img src={pg.image[currentImageIndex]} alt="" />
                            </div>
                       </div>
                       <div className="accomm-child-1">
                            <div className="accomm-child-1-l">
                                <h4>{pg.name}</h4>
                                <p>{pg.location}</p>
                            </div>
                            <div className="accomm-child-1-r">
                               <p><FaStar /> {pg.rating} | ({pg.no_of_reviews}) Reviews</p> 
                            </div>
                       </div>
                       <div className="accomm-child-2">
                        <div className="accomm-child-2-l">
                            <p>Starting from</p>
                            <p> <span>{pg.lowest_price} INR</span>/Month</p>   
                        </div>
                        <div className="accomm-child-2-r">
                        <Link to={`/accommodationDetails`} >
                            <button>View Details</button>
                         </Link>
                        </div>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Accommodation;