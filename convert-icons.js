const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const icons = [
  { input: 'src/static/tab-home.svg', output: 'src/static/tab-home.png' },
  { input: 'src/static/tab-home-active.svg', output: 'src/static/tab-home-active.png' },
  { input: 'src/static/tab-stats.svg', output: 'src/static/tab-stats.png' },
  { input: 'src/static/tab-stats-active.svg', output: 'src/static/tab-stats-active.png' },
];

async function convert() {
  for (const icon of icons) {
    try {
      const svgBuffer = fs.readFileSync(icon.input);
      await sharp(svgBuffer)
        .resize(81, 81)
        .png()
        .toFile(icon.output);
      console.log(`✓ Converted ${icon.input} -> ${icon.output}`);
    } catch (err) {
      console.error(`✗ Failed ${icon.input}:`, err.message);
    }
  }
}

convert();
