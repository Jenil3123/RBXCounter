const fs = require('fs');
const path = require('path');

const dirPath = "d:\\Antigravity\\RBXCounter\\RBXCounter\\src";

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

  // Replace type="title" -> type="screenTitle"
  content = content.replace(/type="title"/g, 'type="screenTitle"');
  // Replace type="subtitle" -> type="sectionTitle"
  content = content.replace(/type="subtitle"/g, 'type="sectionTitle"');
  // Replace type="smallBold" -> type="caption" style={{fontWeight: 'bold'}}
  content = content.replace(/type="smallBold"/g, 'type="caption" style={{fontWeight: "bold"}}');
  // Replace type="small" -> type="caption"
  content = content.replace(/type="small"/g, 'type="caption"');
  // Replace type="default" -> type="body"
  content = content.replace(/type="default"/g, 'type="body"');
  // Note: some types might be missing the type prop, so we don't have to touch them since they default to 'body' now (wait, themed-text defaults to 'default'. I need to fix the default in themed-text).

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
