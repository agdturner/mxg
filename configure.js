const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Function to replace %VERSION% in a file and write to the destination
function replaceVariablesInFile(src, dest) {
  let c = fs.readFileSync(src, 'utf8');
  c = c.replace(/%VERSION%/g, process.env.VERSION);
  c = c.replace(/%GITHUB_USER%/g, process.env.GITHUB_USER);
  fs.writeFileSync(dest, c);
}

// List of files to process
const filesToProcess = [
  { src: 'src/html/index.html.src', dest: 'src/index.html' },
  { src: 'src/tsconfig.json.src', dest: 'tsconfig.json' },
  { src: 'src/manifest.webmanifest.src', dest: 'manifest.webmanifest' },
  { src: 'src/package.json.src', dest: 'package.json' },
  { src: 'src/sw.js.src', dest: 'sw.js' },
  { src: 'src/docs/README.md.src', dest: 'README.md' }
];

// Process each file
filesToProcess.forEach(file => {
  replaceVariablesInFile(file.src, file.dest);
});

