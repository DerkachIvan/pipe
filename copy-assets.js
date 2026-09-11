const fs = require('fs');
const path = require('path');

const srcRoot = path.resolve(__dirname, 'src');
const distRoot = path.resolve(__dirname, 'dist');

if (!fs.existsSync(srcRoot)) {
  process.exit(0);
}

function shouldSkipFile(fileName) {
  return /\.(ts|tsx|d\.ts|js\.map|d\.ts\.map)$/.test(fileName);
}

function copyDirectory(fromDir, toDir) {
  fs.mkdirSync(toDir, { recursive: true });

  for (const entry of fs.readdirSync(fromDir, { withFileTypes: true })) {
    const fromPath = path.join(fromDir, entry.name);
    const toPath = path.join(toDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(fromPath, toPath);
      continue;
    }

    if (shouldSkipFile(entry.name)) {
      continue;
    }

    fs.copyFileSync(fromPath, toPath);
  }
}

copyDirectory(srcRoot, distRoot);
