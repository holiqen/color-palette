import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import './index.css';
import chroma from 'chroma-js';

const deleteIcon = {
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    color: 'white',
    transform: 'scale(1.5)',
  },
};

function DraggableColorBox({ color, name, handleClick }) {
  const isDarkColor = chroma(color).luminance() <= 0.08;
  return (
    <div className="draggable-color-box" style={{ backgroundColor: color }}>
      <div className="draggable-box-content">
        <span className={isDarkColor ? 'light-text' : undefined}>{name}</span>
        <DeleteIcon sx={deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
}

DraggableColorBox.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default DraggableColorBox;
