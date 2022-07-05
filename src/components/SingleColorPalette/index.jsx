import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ColorBox from '../ColorBox';
import Navbar from '../Navbar';
import '../Palette/index.css';
import PaletteFooter from '../PaletteFooter';
import generatePalette from '../../utils/colorHelpers';

function SingleColorPalette({ palettes }) {
  const [format, setFormat] = useState('hex');
  const params = useParams();
  const idPalette = params.paletteId;
  const { colorId } = params;
  const currentDog = palettes.find((palette) => palette.id === idPalette);
  const palette = generatePalette(currentDog);

  const gatherShades = (pallet, colorToFilterBy) => {
    const shades = [];
    const allColors = pallet.colors;
    Object.keys(allColors).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(allColors, key)) {
        shades.push(allColors[key].filter((color) => color.id === colorToFilterBy));
      }
    });
    // for (const key in allColors) {
    //   if (Object.prototype.hasOwnProperty.call(allColors, key)) {
    //     shades.push(allColors[key].filter((color) => color.id === colorToFilterBy));
    //   }
    // }
    return shades.slice(1).flat();
  };

  const shades = gatherShades(palette, colorId);

  const handleChangeFormat = (value) => {
    setFormat(value);
  };

  return (
    <div className="single-color-palette palette">
      <Navbar handleChangeFormat={handleChangeFormat} showingAllColor={false} />
      <div className="palette-colors">
        {shades &&
          shades.map((color) => (
            <ColorBox key={color.name} name={color.name} background={color[format]} showLink={false} />
          ))}
        <div className="go-back color-box">
          <Link to={`/palette/${palette.id}`} className="back-button">
            Go Back
          </Link>
        </div>
      </div>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
}

SingleColorPalette.propTypes = {
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

export default SingleColorPalette;
