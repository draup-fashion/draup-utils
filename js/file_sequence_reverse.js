const fs = require('fs');

if (process.argv.length <= 3) {
    console.log("usage: file_sequence_reverse source_directory output_directory");
    process.exit(1);
}

let args = process.argv.slice(2);
srcDir = args[0];
outputDir = args[1];

fs.readdir(srcDir, (err, files) => {
  if (err) throw err;

  let pngFiles = files.filter(file => file.endsWith('.png'));

  pngFiles.forEach((file, index) => {
    let match = file.match(/(\d+)\.png$/);
    if (!match) return;

    let number = match[1];
    let reversedNumber = (pngFiles.length - number + 1).toString().padStart(3, '0');
    let source = `${srcDir}/${file}`;
    let destination = `${outputDir}/${file.replace(number, reversedNumber)}`;

    console.log(`Copying ${source} to ${destination}`);

    fs.copyFile(source, destination, (err) => {
      if (err) throw err;
    });
  });
});
