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
  { src: 'src/html/index.html', dest: 'index.html' },
  { src: 'src/tsconfig.json', dest: 'tsconfig.json' },
  { src: 'src/manifest.webmanifest', dest: 'manifest.webmanifest' },
  { src: 'src/package.json', dest: 'package.json' },
  { src: 'src/sw.js', dest: 'sw.js' },
  { src: 'src/docs/README.md', dest: 'README.md' }
];

// Process each file
filesToProcess.forEach(file => {
  replaceVariablesInFile(file.src, file.dest);
});

