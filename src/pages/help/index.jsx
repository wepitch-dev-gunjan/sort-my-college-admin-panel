import { Autocomplete, Stack, TextField, Tooltip } from '@mui/material';
import './style.scss';
import { MdOutlineChat } from "react-icons/md";
import { useState } from 'react';
import ChatContainer from '../../components/chatContainer';

const Help = () => {

  const [chatEnable, setChatEnable] = useState(false);
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
  ];
  return (
    <div className='Help-container'>
      {chatEnable && <ChatContainer />}
      <div className="help-search">
        <h1>Welcome! How can we help?</h1>
        <Stack spacing={2} sx={{ width: 300 }}>

          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={top100Films.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
        </Stack>
      </div>
      <Tooltip title="Chat" placement='left'>
        <div className="chat-help" onClick={() => setChatEnable(prev => !prev)}>
          <MdOutlineChat size={32} color='white' />
        </div>
      </Tooltip>
    </div>
  );
};

export default Help;