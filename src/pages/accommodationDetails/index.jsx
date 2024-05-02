import ViewAccoummDetails from '../../components/accommodationViewDetails'
import './style.scss';
import { LuDot } from "react-icons/lu";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";


import prop_1 from '../../assets/prop-1.jpg'
import prop_2 from '../../assets/prop-2.jpg'
import prop_3 from '../../assets/prop-3.jpg'
import prop_4 from '../../assets/prop-4.jpg'
import prop_5 from '../../assets/prop-5.jpg'
import bed from '../../assets/single-bed_2336996.png' 
import bed_svg from '../../assets/single-bed_2336996.svg'
import clock from '../../assets/clock_2997300.png'
import { Link } from 'react-router-dom';

const AccommodationDetails = () => {
    const property = {
        type: 'PG',
    
        images: [prop_1, prop_2, prop_3, prop_4, prop_5],
        name: 'Zeel by the Lake- 4-BDR pool villa',
        address: {
          area: 'C-Scheme',
          city: 'Jaipur',
          state: 'Rajasthan',
          pin_code: '32001',
        },
        direction: 'https://maps.app.goo.gl/nNQhHTz8piX91iPs7',
        total_beds: 200,
        recommended_for: "Girls",
    
        owner: {
          full_name: 'Rakshita Kanwar',
          dob: '2024-04-06T08:34:14.626+00:00',
          gender: 'Female',
          contact_numbers: ['+916376038276', '+918233449683'],
          email: 'rakshitakanwar09@gmail.com',
          aadhar_card: '127365478907',
          pan_card: 'MFNPK9212A',
        },
    
        nearby_locations: {
          colleges: ['LMNIIT', 'SKIT', 'MNIT', 'IRIS College', 'University Rajasthan College'],
          hospitals: ['Mahatma Gandhi Hospital', 'Fortis'],
          metro_stations: ['Shyam Nagar', 'C-Scheme'],
        },
    
        rooms: [
          {
            sharing_type: 'Single',
            available: true,
            deposit_amount: 4000,
            monthly_charge: 20000,
            notice_period: 20,
            details: ['AC', 'Geyser', 'Game Room'],
          },
          {
            sharing_type: 'Double',
            available: false,
            deposit_amount: 1500,
            monthly_charge: 12000,
            notice_period: 20,
            details: ['AC', 'Washing Machine', 'Private Theatre'],
          },
          {
            sharing_type: 'Triple',
            available: true,
            deposit_amount: 1500,
            monthly_charge: 10000,
            notice_period: 20,
            details: ['AC', 'Geyser', 'Kitchen', 'Extra Mattress'],
          },
          {
            sharing_type: 'Double',
            available: false,
            deposit_amount: 1300,
            monthly_charge: 8000,
            notice_period: 20,
            details: ['Non-AC', 'Washing Machine', 'Private Theatre'],
          },
          
        ],
    
        rating: 5,
    
        common_area_amenities: ['Laundry Facilities', 'Security', 'Wi-Fi', 'Housekeeping', 'Power Backup', 'Recreation Facilities', 'Fitness Center'],
        house_rules: [
            'Respect privacy',
            'Clean up after',
            'No smoking',
            'Registered guests only',
            'Report maintenance issues',
            'Keep noise down',
            'Follow parking rules',
            'Conserve energy',
            'Dispose garbage properly',
            'Be respectful',
            'Notify for long absences',
            'No unauthorized modifications',
            'Follow additional rules',
            'Compliance required'
          ]
          ,
        gate_opening_time: '06:00 am',
        gate_closing_time: '11:30 pm',
      }
    const types_of_rooms = property.rooms.length;
    const getNumberOfBeds = (sharingType) => {
      switch (sharingType) {
        case 'Single':
          return 1;
        case 'Double':
          return 2;
        case 'Triple':
          return 3;
        default:
          return 0;
      }
    };
    
    return(
    <>
        <div className="accomm-dets-main">
            <div className="accomm-dets-sub">
                <div className="property-title">
                    <h1>{ property.name } in {property.address.area}</h1>
                </div>
                <div className="property-images">
                    <div className="main-property-image">
                        <img src={ property.images[1] } alt="" />
                    </div>
                    <div className="property-image-col">
                        <img src={ property.images[0] } alt="" />
                        <img src={ property.images[2] } alt="" />
                    </div>
                    <div className="property-image-col">
                        <img src={ property.images[3] } alt="" />
                        <img src={ property.images[4] } alt="" />
                    </div>
                </div>
                <div className="property-info">
                  <div className="property-info-left">
                    <h2>{property.type} in {property.address.area}, {property.address.city}, {property.address.state}</h2>
                    <p> 
                      <span className='bubble-r'> Recommended for {property.recommended_for} </span> 
                      <LuDot /> 
                      <span className='bubble-r'>{property.total_beds} Beds </span>
                      <LuDot /> 
                      <span className='bubble-r'>{types_of_rooms} Types of rooms</span>
                      <LuDot /> 
                      <span className='bubble-r'><FaStar color='#FAB811'/> 4.2 | (8) Reviews</span>
                    </p>
                    <p><span className='bubble-r' ><img className='clock' src={ clock } />  Gate opens @ {property.gate_opening_time} & closes at {property.gate_closing_time}</span></p>
                  </div>
                  <div className="property-info-right">
                    <Link to={property.direction}>View Directions</Link>
                  </div>
                </div>
                <div className="property-common-amenities">
                  <h2>What this place offers</h2>
                  <div className="property-amenities-sub">
                    {property.common_area_amenities.map((common_amenity, i) => (
                      <p>
                        <span className='bubble-r'>{common_amenity}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="property-rooms-main">
                  <h2>Rooms Offered</h2>
                  <div className="property-rooms-sub">
                    {property.rooms.map((room, i) => (
                      <div className='property-rooms-children'>
                        <div className="rooms-icon">
                          {[...Array(getNumberOfBeds(room.sharing_type))].map((_, index) => (
                              <img src={bed_svg} alt="" />
                            ))}
                        </div>
                        <div className="room-details">
                          <div className="room-details-sec sharing-n-available">
                            <h5>{room.sharing_type} Sharing</h5>
                            {room.available ? <p className='avail'>Available</p> : <p className='n-avail'>Not Available</p>}
                          </div>
                          <div className='room-details-sec' >
                            <p><LiaRupeeSignSolid /> {room.deposit_amount} one time deposit</p>
                            <p><LiaRupeeSignSolid /> {room.monthly_charge} per month</p>
                          </div>
                          <p>{room.notice_period} days notice period</p>
                          <div className="room-details-sec room-detail-p">
                            {room.details.map((detail, i) => (
                              <p className='room-detail-c' >{detail}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="nearby-places">
                  <div className="nearby-places-sub">
                    <h2>Nearby Colleges</h2>
                    <div className="nearby-places-child">
                      {property.nearby_locations.colleges.map((college, i) => (
                        <p><span className='bubble-r'>{college}</span></p>
                      ))}
                    </div>
                  </div>
                  <div className="nearby-places-sub">
                    <h2>Nearby Hospitals</h2>
                    <div className="nearby-places-child">
                      {property.nearby_locations.hospitals.map((hospital, i) => (
                        <p><span className='bubble-r'>{hospital}</span></p>
                      ))}
                    </div>
                  </div>
                  <div className="nearby-places-sub">
                    <h2>Nearby Metro Stations</h2>
                    <div className="nearby-places-child">
                      {property.nearby_locations.metro_stations.map((station, i) => (
                        <p><span className='bubble-r'>{station}</span></p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="property-house-rules property-common-amenities">
                  <h2>House Rules</h2>
                  <div className="property-amenities-sub">
                    {property.house_rules.map((rule, i) => (
                      <p>
                        <span className='bubble-r'>{rule}</span>
                      </p>
                    ))}
                  </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default AccommodationDetails