import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard/src';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import PropTypes from 'prop-types';
import './index.css';

function ColorBox({ background, name, id, paletteId, showLink }) {
  const [copied, setCopied] = useState(false);
  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.6;

  const handleCopyChange = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CopyToClipboard text={background} onCopy={handleCopyChange}>
      <div style={{ backgroundColor: background }} className="color-box">
        <div style={{ backgroundColor: background }} className={`copy-overlay ${copied && 'show'}`} />
        <div className={`copy-msg ${copied && 'show'}`}>
          <h1>Copied!</h1>
          <p className={isLightColor ? 'dark-text' : undefined}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={isDarkColor ? 'light-text' : undefined}>{name}</span>
          </div>
          <button type="button" className={`copy-button ${isLightColor ? 'dark-text' : undefined}`}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
            <span className={`see-more ${isLightColor ? 'dark-text' : undefined}`}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

ColorBox.propTypes = {
  background: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  paletteId: PropTypes.string,
  showLink: PropTypes.bool.isRequired,
};

export default ColorBox;
