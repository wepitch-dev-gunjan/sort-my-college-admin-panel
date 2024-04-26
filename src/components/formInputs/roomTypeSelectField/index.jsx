import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function RoomTypeSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type of Room</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Type of Room"
          onChange={handleChange}
        >
          <MenuItem value="Single">Single Sharing</MenuItem>
          <MenuItem value="Double">Double Sharing</MenuItem>
          <MenuItem value="Triple">Triple Sharing</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}