import React, { memo } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import './index.css';

const DeleteIconStyle = {
  color: 'white',
  backgroundColor: '#eb3d30',
  width: '20px',
  height: '20px',
  position: 'absolute',
  right: 0,
  top: 0,
  padding: '10px',
  zIndex: '10',
  opacity: 0,
  transition: 'all 0.3s ease-in-out',
};

function MiniPalette({ palette, openDialog }) {
  const { paletteName, emoji, id, colors } = palette;

  const deletePaletteDialog = (event) => {
    event.preventDefault();
    openDialog(id);
  };

  return (
    <div className="mini-palette">
      <DeleteIcon sx={DeleteIconStyle} onClick={deletePaletteDialog} />
      <div className="colors">
        {colors.map((color) => (
          <div key={color.name} className="mini-colors" style={{ backgroundColor: `${color.color}` }} />
        ))}
      </div>
      <div className="title-and-emoji-box">
        <h5 className="title">{paletteName}</h5>
        <span className="emoji">{emoji}</span>
      </div>
    </div>
  );
}

MiniPalette.propTypes = {
  palette: PropTypes.shape({
    paletteName: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  openDialog: PropTypes.func.isRequired,
};

export default memo(MiniPalette);
