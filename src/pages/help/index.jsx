import { Autocomplete, Stack, TextField, Tooltip } from '@mui/material';
import './style.scss';
import { MdOutlineChat, MdOutlineFeaturedPlayList } from "react-icons/md";
import { useState } from 'react';
import { FaRegCompass, FaRegQuestionCircle } from "react-icons/fa";
import ChatContainer from '../../components/chatContainer';
import { Link } from 'react-router-dom';

const Help = () => {

  const [chatEnable, setChatEnable] = useState(false);
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
  ];
  return (
   <div>
 <h3>No Queries</h3>
   </div>
//     <div className='Help-container'>
//       {chatEnable && <ChatContainer />}
//       <div className="help-search">
//         <h1>Welcome! How can we help?</h1>
//         <Stack spacing={2} sx={{ width: 300 }}>

//           <Autocomplete
//             freeSolo
//             id="free-solo-2-demo"
//             disableClearable
//             options={top100Films.map((option) => option.title)}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Search input"
//                 InputProps={{
//                   ...params.InputProps,
//                   type: 'search',
//                 }}
//               />
//             )}
//           />
//         </Stack>
//       </div>
//       {/* <div className="help-section"> */}
//        {/* <div className="key-feature">
// <MdOutlineFeaturedPlayList size ={52}/>
// <div className="feature-text">
//  <h4>Key Features</h4>
//  <p>See Key features Here </p>
// </div> */}
//        </div>
//        {/* <div className="faq">
//        <FaRegQuestionCircle size={52} />
//           <div className="feature-text">
//           <h4>FAQ & <Link to="/help/faq-and-troubleshooting">Troubleshooting</Link></h4>
//           <p>See Questions Here</p>
//         </div>
//        </div> */}
//        {/* <div className="guide">
//           <FaRegCompass size={52} />
//           <div className="feature-text">
//           <h4>Guide Center</h4>
//           <p>Ideas and guide for SMC.</p>
//         </div>
//         </div> */}
//       // </div>
//       {/* <Tooltip title="Chat" placement='left'>
//         <div className="chat-help" onClick={() => setChatEnable(prev => !prev)}>
//           <MdOutlineChat size={32} color='white' />
//         </div>
//       </Tooltip> */}
//     // </div>
  );
};

export default Help;