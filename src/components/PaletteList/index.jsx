import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { blue, red } from '@mui/material/colors';
import { useDeleteDialog } from './logic';
import './index.css';
import MiniPalette from '../MiniPalette';

function PaletteList({ palettes, deletePalette }) {
  const { open, closeDialog, handleDeletePalette, openDialog } = useDeleteDialog(deletePalette);

  return (
    <div className="palette-list">
      <div className="palette-list-container">
        <nav className="palette-list-nav">
          <h1>Color Palette</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className="palettes">
          {palettes &&
            palettes.map((palette) => (
              <CSSTransition classNames="fade" timeout={500} key={palette.id}>
                <Link className="palettes-link" to={`/palette/${palette.id}`}>
                  <MiniPalette palette={palette} openDialog={openDialog} />
                </Link>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
      <Dialog open={open} aria-labelledby="delete-dialog-title" onClose={closeDialog}>
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
        <List>
          <ListItemButton onClick={handleDeletePalette}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItemButton>
          <ListItemButton onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItemButton>
        </List>
      </Dialog>
    </div>
  );
}

PaletteList.propTypes = {
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
  deletePalette: PropTypes.func.isRequired,
};

export default PaletteList;
