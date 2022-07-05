import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const getRange = (hexColor) => {
  const endColor = '#fff';
  return [chroma(hexColor).darken(1.4).hex(), hexColor, endColor];
};

const getScale = (hexColor, numberOfColors) => chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);

const generatePalette = (starterPalette) => {
  const newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {},
  };
  //
  // Object.keys(levels).forEach((level) => {
  //   if (Object.prototype.hasOwnProperty.call(levels, level)) {
  //     newPalette.colors[level] = [];
  //   }
  // });

  // eslint-disable-next-line no-restricted-syntax
  for (const level of levels) {
    newPalette.colors[level] = [];
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const color of starterPalette.colors) {
    const scale = getScale(color.color, 10).reverse();

    // Object.keys(scale).forEach((i) => {
    //   if (Object.prototype.hasOwnProperty.call(scale, i)) {
    //     newPalette.colors[levels[i]]?.push({
    //       name: `${color.name} ${levels[i]}`,
    //       id: color.name.toLowerCase().replace(/ /g, '-'),
    //       hex: scale[i],
    //       rgb: chroma(scale[i]).css(),
    //       rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)'),
    //     });
    //   }
    // });

    // eslint-disable-next-line no-restricted-syntax
    for (const i in scale) {
      if (Object.prototype.hasOwnProperty.call(scale, i)) {
        newPalette.colors[levels[i]]?.push({
          name: `${color.name} ${levels[i]}`,
          id: color.name.toLowerCase().replace(/ /g, '-'),
          hex: scale[i],
          rgb: chroma(scale[i]).css(),
          rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)'),
        });
      }
    }
  }

  return newPalette;
};

export default generatePalette;

// Media Query Sizes
// xs: 576px
// sm: 768px
// md: 992px
// lg: 1200px
