import React, { useState } from 'react';
  import "./style.scss"
import pg_1 from '../../assets/pg-1.jpg';
import pg_2 from '../../assets/pg-2.jpg';
import pg_3 from '../../assets/pg-3.jpg';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ViewAccoummDetails = () => {
 const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
 const details =[
  {
   name: "Ram Niwas PG",
   about: "lorem13",
   img: [pg_1, pg_2,pg_3 ],
   location : "Ram Bagh Circle, Jaipur",
   rating : "4.2",
   no_of_reviews : "8",
   lowest_price : "6000",
  }
 ]
  return (
    <div className="accommodation_main">
    {details.map((detail,i) => (
     <div className="accommodation_details">
      <div className="detail_main">
<div className="details">
 <h4>Name : {detail.name}</h4>
 <p>Starting From <br/>
  {detail.lowest_price} INR/Month</p>
  <div className="property_info">
   <h4>Property Info</h4>
   <p>name : </p>
   <p>Location : </p>
  </div>
</div>
     </div>
     <div className="accomodation_right">
      <div className="accommodation_image">
       Image
{/* {detail.img} */}
      </div>
      <div className="accommodation_right_details">
       <h4>Rooms Offered</h4>
<div className="right_details">
 {/* single Share */}
<div className="singleShare">
 <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{  flexShrink: 0 }}>
        Single Share
          </Typography>
          {/* <Typography sx={{  flexShrink: 0 }}>
      Price
          </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
</div>
{/* double share */}
<div className="doubleShare">
<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{  flexShrink: 0 }}>
     Double Share
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
</div>
{/* triple Share */}
<div className="tripleShare">
<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{  flexShrink: 0 }}>
   Triple Share
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
</div>
</div>
      </div>
     </div>
     </div>
 ))}
    </div>
  )
}

export default ViewAccoummDetails