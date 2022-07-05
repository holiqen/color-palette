import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import data from '@emoji-mart/data';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function EmojiPicker(props) {
  const ref = useRef();

  useEffect(() => {
    new Picker({ ...props, data, ref });
  }, []);

  return <div ref={ref} />;
}

function PaletteMetaForm({ colors, palettes, savePalette, hideForm, formShowing }) {
  const [emojiShow, setEmojiShow] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState('');
  const navigate = useNavigate();

  const handleSavePalette = (emoji) => {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors,
    };
    savePalette(newPalette);
    setEmojiShow(false);
    navigate('/');
  };

  const handleChangeNewPaletteName = (event) => {
    setNewPaletteName(event.target.value);
  };

  const isPaletteNameUnique = (palettes, newPaletteName) =>
    palettes.every((palette) => palette.paletteName.toLowerCase() !== newPaletteName.toLowerCase());

  const goToEmoji = (event) => {
    event.preventDefault();
    hideForm();
    setEmojiShow(!emojiShow);
  };

  const validNewPaletteName = isPaletteNameUnique(palettes, newPaletteName);

  return (
    <div>
      <Dialog open={emojiShow} onClose={() => setEmojiShow(false)}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <EmojiPicker onEmojiSelect={handleSavePalette} />
      </Dialog>
      <Dialog
        open={formShowing}
        TransitionComponent={Transition}
        keepMounted
        onClose={hideForm}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <Box component="form">
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please enter a name for your new palette. Make sure it&#39;s unique!
            </DialogContentText>
            <TextField
              variant="standard"
              required
              fullWidth
              margin="normal"
              error={!newPaletteName || !validNewPaletteName}
              value={newPaletteName}
              onChange={handleChangeNewPaletteName}
              helperText={newPaletteName || validNewPaletteName ? '' : 'Incorrect palette name!'}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit" onClick={goToEmoji}>
              Save Palette
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

PaletteMetaForm.propTypes = {
  colors: PropTypes.array.isRequired,
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
    })
  ).isRequired,
  savePalette: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired,
  formShowing: PropTypes.bool.isRequired,
};

export default PaletteMetaForm;
