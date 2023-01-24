const fs = require('fs');

let targetDir = "/tmp/example_target";
let outputDir = "/tmp/example_out";

let args = process.argv.slice(2);
targetDir = args[0];
outputDir = args[1];

fs.readdir(targetDir, (err, files) => {
  if (err) throw err;

  let pngFiles = files.filter(file => file.endsWith('.png'));

  pngFiles.forEach((file, index) => {
    let match = file.match(/(\d+)\.png$/);
    if (!match) return;

    let number = match[1];
    let reversedNumber = (pngFiles.length - number + 2).toString().padStart(3, '0');
    let source = `${targetDir}/${file}`;
    let destination = `${outputDir}/${file.replace(number, reversedNumber)}`;

    console.log(`Copying ${source} to ${destination}`);

    fs.copyFile(source, destination, (err) => {
      if (err) throw err;
    });
  });
});
