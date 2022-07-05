import { Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import seedColors from './seedColors';
import SingleColorPalette from './components/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm';
import PageWrapper from './components/PageWrapper';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const location = useLocation();

  const syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  };

  useEffect(() => {
    syncLocalStorage();
  }, [palettes]);

  const savePalette = (newPalette) => {
    setPalettes((prevState) => [...prevState, newPalette]);
  };

  const deletePalette = (id) => {
    setPalettes((prevState) => prevState.filter((palette) => palette.id !== id));
  };

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="page-wrapper" timeout={500}>
        <Routes location={location}>
          <Route
            exact
            path="/palette/new"
            element={
              <PageWrapper>
                <NewPaletteForm savePalette={savePalette} palettes={palettes} />
              </PageWrapper>
            }
          />
          <Route
            exact
            path="/"
            element={
              <PageWrapper>
                <PaletteList palettes={palettes} deletePalette={deletePalette} />
              </PageWrapper>
            }
          />
          <Route
            exact
            path="/palette/:id"
            element={
              <PageWrapper>
                <Palette palettes={palettes} />
              </PageWrapper>
            }
          />
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            element={
              <PageWrapper>
                <SingleColorPalette palettes={palettes} />
              </PageWrapper>
            }
          />
          <Route
            path="*"
            element={
              <PageWrapper>
                <PaletteList palettes={palettes} deletePalette={deletePalette} />
              </PageWrapper>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
