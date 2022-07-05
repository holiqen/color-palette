import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import PropTypes from 'prop-types';
import { drawerWidth } from '../NewPaletteForm';
import './index.css';
import PaletteMetaForm from '../PaletteMetaForm';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TitleStyle = {
  '@media (max-width: 576px)': {
    fontSize: '0.8rem',
  },
};

const NavButtons = {
  marginRight: '1rem',
  '@media (max-width: 576px)': {
    marginRight: '1rem',
  },
};

const ButtonStyle = {
  '@media (max-width: 576px)': {
    fontSize: '0.5rem',
  },
};

function PaletteFormNav({ open, palettes, setOpen, savePalette, colors }) {
  const [formShowing, setFormShowing] = useState(false);
  const matches = useMediaQuery('(max-width:576px)');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const showForm = () => {
    setFormShowing(!formShowing);
  };

  const hideForm = () => {
    setFormShowing(false);
  };

  return (
    <div className="palette-form-nav">
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 1, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {!matches && (
            <Typography sx={TitleStyle} variant="h6" noWrap component="div">
              Persistent drawer
            </Typography>
          )}
        </Toolbar>
        <Box component="form" sx={NavButtons}>
          <Link to="/" className="go-back-button">
            <Button sx={ButtonStyle} style={{ marginRight: '0.5rem' }} variant="contained" color="error">
              Go Back
            </Button>
          </Link>
          <Button sx={ButtonStyle} variant="contained" onClick={showForm}>
            Save
          </Button>
        </Box>
      </AppBar>
      <PaletteMetaForm
        palettes={palettes}
        savePalette={savePalette}
        colors={colors}
        hideForm={hideForm}
        formShowing={formShowing}
      />
    </div>
  );
}

PaletteFormNav.propTypes = {
  open: PropTypes.bool.isRequired,
  palettes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setOpen: PropTypes.func.isRequired,
  savePalette: PropTypes.func.isRequired,
  colors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PaletteFormNav;
