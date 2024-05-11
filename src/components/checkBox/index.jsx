import React, { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxLabels({ options, onChange }) {
  const [selectedCheckbox, setSelectedCheckbox] = useState(() => {
    // Find the initial selected checkbox (assuming its name is "Registered")
    const initialSelected = options.find(
      (option) => option.name === "Registered"
    );
    return initialSelected ? initialSelected.name : ""; // Set the initial selected checkbox name
  });

  useEffect(() => {
    onChange(selectedCheckbox);
  }, [selectedCheckbox]);

  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    setSelectedCheckbox(name);
  };

  return (
    <FormGroup>
      {options.map((option) => (
        <FormControlLabel
          key={option.id}
          control={
            <Checkbox
              checked={selectedCheckbox === option.name}
              onChange={handleCheckboxChange}
              name={option.name}
            />
          }
          label={option.name}
        />
      ))}
    </FormGroup>
  );
}
