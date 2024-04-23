import React from 'react'
import "./style.scss"
import pg_1 from '../../assets/pg-1.jpg';
import pg_2 from '../../assets/pg-2.jpg';
import pg_3 from '../../assets/pg-3.jpg';
const ViewAccoummDetails = () => {
 const details =[
  {
   "name": "Ram Niwas PG",
   "about": "lorem13",
   "img": [pg_1, pg_2,pg_3 ],
   "location" : "Ram Bagh Circle, Jaipur",
   "rating" : "4.2",
   "no_of_reviews" : "8",
   "lowest_price" : "6000",
  }
 ]
  return (
    <div className="accommodation_main">
  
    {details.map((detail,i) => (
     <div className="accommodation_details">
      <div className="detail_main">
<div className="details">
 <h3>Name : {detail.name}</h3>
 <p>Starting From <br/>
  {detail.lowest_price} INR/Month</p>
</div>
     </div>
     <div className="accomodation_right">
      <div className="accommodation_image">
       Image
{/* {detail.img} */}
      </div>
      <div className="accommodation_right_details">
Right Details
lorem40
      </div>
     </div>
     </div>
 ))}
    </div>
  )
}

export default ViewAccoummDetails