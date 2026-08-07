const fs = require('fs');
const path = require('path');

const dirPath = "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(setup)";

function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      findFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.tsx')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = findFiles(dirPath);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Fix colors to Colors
  content = content.replace(/backgroundColor: colors\.dark\.background/g, 'backgroundColor: Colors.dark.background');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
});
