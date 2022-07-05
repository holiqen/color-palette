import { ChromePicker } from 'react-color';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import chroma from 'chroma-js';

const AddButton = {
  width: '100%',
  padding: '1rem',
  marginTop: '1rem',
  fontSize: '1rem',
};

const ColorNameInput = {
  width: '100%',
};

function ColorPickerForm({ isPaletteFull, setColors, colors }) {
  const [currentColor, setCurrentColor] = useState('teal');
  const [newColorName, setNewName] = useState('');
  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };
  const isDarkColor = chroma(currentColor).luminance() <= 0.08;

  const addNewColor = (event) => {
    event.preventDefault();
    const newColor = { color: currentColor, name: newColorName };
    setColors((prevColors) => [...prevColors, newColor]);
  };

  const handleChangeNewColorName = (event) => {
    setNewName(event.target.value);
  };

  const isColorUnique = (colors, newColorName) => colors.every((color) => color.name !== newColorName);

  const validNewColorName = isColorUnique(colors, newColorName);

  return (
    <div>
      <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} className="picker" />
      <Box component="form" onSubmit={addNewColor}>
        <TextField
          sx={ColorNameInput}
          variant="filled"
          size="small"
          placeholder="Color Name"
          margin="normal"
          required
          error={!newColorName || !validNewColorName}
          value={newColorName}
          onChange={handleChangeNewColorName}
          helperText={newColorName || validNewColorName ? '' : 'Incorrect color name!'}
        />
        <Button
          sx={AddButton}
          className={isDarkColor ? 'light-text' : 'dark-text'}
          type="submit"
          variant="contained"
          color="primary"
          style={{ backgroundColor: currentColor }}
          disabled={!newColorName || !validNewColorName || isPaletteFull}
        >
          {isPaletteFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </Box>
    </div>
  );
}

ColorPickerForm.propTypes = {
  isPaletteFull: PropTypes.bool.isRequired,
  setColors: PropTypes.func.isRequired,
  colors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ColorPickerForm;
