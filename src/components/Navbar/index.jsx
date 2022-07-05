import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import { IconButton, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.css';

function Navbar({ level, changeLevel, handleChangeFormat, showingAllColor }) {
  const [format, setFormat] = useState('hex');
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery('(max-width:576px)');

  const handleChange = (event) => {
    setFormat(event.target.value);
    handleChangeFormat(event.target.value);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">{matches ? 'CP' : 'colorpalette'}</Link>
      </div>
      {showingAllColor && (
        <div className="slider-container">
          <span className="slider-level">
            Level:
            {level}
          </span>
          <div className="slider">
            <Slider defaultValue={level} min={100} max={900} step={100} onChange={changeLevel} />
          </div>
        </div>
      )}
      <div className="select-container">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select value={format} label="hex" onChange={handleChange}>
            <MenuItem value="hex">HEX - #fff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 0.3)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={
          <span id="message-id">
            Format Changed To
            {format.toUpperCase()}
          </span>
        }
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        action={[
          <IconButton onClick={closeSnackbar} color="inherit" key="close" aria-label="close">
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </header>
  );
}

Navbar.propTypes = {
  level: PropTypes.number,
  changeLevel: PropTypes.func,
  handleChangeFormat: PropTypes.func.isRequired,
  showingAllColor: PropTypes.bool.isRequired,
};

export default Navbar;
