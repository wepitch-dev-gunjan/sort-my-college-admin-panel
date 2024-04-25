import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RecommendedForRadioButtons() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Recommended For: </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="BOYS" control={<Radio />} label="Boys" />
        <FormControlLabel value="GIRLS" control={<Radio />} label="Girls" />
        <FormControlLabel value="BOTH" control={<Radio />} label="Both" />
      </RadioGroup>
    </FormControl>
  );
}