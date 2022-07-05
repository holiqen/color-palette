import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import DraggableColorBox from '../DraggableColorBox';
import './index.css';
import PaletteFormNav from '../PaletteFormNav';
import ColorPickerForm from '../ColorPickerForm';
import seedColors from '../../seedColors';

export const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const DraggableColorBoxes = {
  display: 'flex',
  flexWrap: 'wrap',
  height: 'calc(100vh - 64px)',
  alignContent: 'flex-start',
};

const ButtonStyle = {
  width: '40%',
  fontSize: '0.7rem',
  '@media (max-width: 576px)': {
    fontSize: '0.5rem',
    width: '40%',
  },
};

const NewPaletteFormBox = {
  display: 'flex',
  height: '100vh',
  overflow: 'scroll',
};

function NewPaletteForm({ savePalette, palettes }) {
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState(seedColors[0].colors);
  const maxColors = 20;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const deleteColor = (colorName) => {
    setColors((prevColors) => prevColors.filter((color) => color.name !== colorName));
  };

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allColors = seedColors.map((palette) => palette.colors).flat();
    const colorsName = colors.map((color) => color.name);
    const filteredColors = allColors.filter((color) => !colorsName.includes(color.name));
    const randomNumber = Math.floor(Math.random() * filteredColors.length);
    const randomColor = filteredColors[randomNumber];

    setColors((prevColors) => [...prevColors, randomColor]);
  };

  const isPaletteFull = colors.length >= maxColors;

  return (
    <Box sx={NewPaletteFormBox}>
      <PaletteFormNav open={open} palettes={palettes} setOpen={setOpen} savePalette={savePalette} colors={colors} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className="draw-container">
          <Typography variant="h5" gutterBottom>
            Design Your Palette
          </Typography>
          <div className="buttons">
            <Button sx={ButtonStyle} variant="contained" color="error" onClick={clearColors}>
              Clear Palette
            </Button>
            <Button
              sx={ButtonStyle}
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={isPaletteFull}
            >
              {isPaletteFull ? 'Palette Full' : 'Random Color'}
            </Button>
          </div>
          <ColorPickerForm isPaletteFull={isPaletteFull} setColors={setColors} colors={colors} />
        </div>
      </Drawer>
      <Main open={open}>
        <>
          <DrawerHeader />
          <Box sx={DraggableColorBoxes}>
            {colors &&
              colors.map((color) => (
                <DraggableColorBox
                  key={color.name}
                  color={color.color}
                  name={color.name}
                  handleClick={() => deleteColor(color.name)}
                />
              ))}
          </Box>
        </>
      </Main>
    </Box>
  );
}

NewPaletteForm.propTypes = {
  savePalette: PropTypes.func.isRequired,
  palettes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewPaletteForm;
