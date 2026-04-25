 import fs from 'fs';
import path from 'path';

// List of folders your app needs (relative to project root)
const requiredFolders = [
  'uploads',     // for file uploads (if you add them)
  'logs',        // for runtime logs
  'temp',        // for temporary processing
  'data',        // optional: persistent JSON storage
];

// Get the project root (where package.json lives)
const projectRoot = path.resolve(__dirname, '../..');

export function ensureFoldersExist() {
  for (const folder of requiredFolders) {
    const fullPath = path.join(projectRoot, folder);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✅ Created missing folder: ${folder}`);
    } else {
      console.log(`✓ Folder already exists: ${folder}`);
    }
  }
}