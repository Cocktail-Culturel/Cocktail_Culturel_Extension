const sharp = require("sharp");

[16, 19, 32, 38, 48, 64, 96, 128, 256, 512].forEach((size) => {
  sharp("src/assets/logo.svg")
    .png()
    .resize({ width: size, height: size })
    .toFile(`public/icons/${size}.png`);
});
