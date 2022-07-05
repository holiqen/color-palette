import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ColorBox from '../ColorBox';
import Navbar from '../Navbar';
import './index.css';
import PaletteFooter from '../PaletteFooter';
import generatePalette from '../../utils/colorHelpers';

function Palette({ palettes }) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState('hex');

  const params = useParams();
  const idPalette = params.id;
  const currentDog = palettes.find((palette) => palette.id === idPalette);
  const palette = generatePalette(currentDog);

  const changeLevel = (value) => {
    setLevel(value);
  };

  const handleChangeFormat = (value) => {
    setFormat(value);
  };

  return (
    <div className="palette">
      <Navbar level={level} changeLevel={changeLevel} handleChangeFormat={handleChangeFormat} showingAllColor />
      <div className="palette-colors">
        {palette &&
          palette.colors[level].map((color) => (
            <ColorBox
              key={color.id}
              background={color[format]}
              name={color.name}
              id={color.id}
              paletteId={idPalette}
              showLink
            />
          ))}
      </div>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
}

Palette.propTypes = {
  palettes: PropTypes.arrayOf(
    PropTypes.shape({
      paletteName: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      colors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired,
        })
      ).isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Palette;
