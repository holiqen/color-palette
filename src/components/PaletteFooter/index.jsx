import React from 'react';
import PropTypes from 'prop-types';

function PaletteFooter({ paletteName, emoji }) {
  return (
    <footer className="palette-footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  );
}

PaletteFooter.propTypes = {
  paletteName: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
};

export default PaletteFooter;
