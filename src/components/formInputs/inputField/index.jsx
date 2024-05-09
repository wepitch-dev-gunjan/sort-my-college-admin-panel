import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextField(props) {
 console.log(props)
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="outlined-basic" 
        label={props.placeholder} 
        variant="outlined" 
        name={props.name} // Pass the name prop here
        value={props.value} // Pass the value prop here
        onChange={props.onChange} // Pass the onChange prop here
      />
    </Box>
  );
}
