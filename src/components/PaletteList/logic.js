import { useCallback, useState } from 'react';

export const useDeleteDialog = (deletePalette) => {
  const [open, setOpen] = useState(false);
  const [currentPaletteId, setCurrentPaletteId] = useState('');

  const openDialog = useCallback((id) => {
    setCurrentPaletteId(id);
    setOpen(true);
  }, []);

  const closeDialog = () => {
    setCurrentPaletteId('');
    setOpen(false);
  };

  const handleDeletePalette = () => {
    deletePalette(currentPaletteId);
    closeDialog();
  };

  return { open, openDialog, closeDialog, handleDeletePalette };
};
