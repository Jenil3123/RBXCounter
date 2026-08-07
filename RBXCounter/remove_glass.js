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

  // Replace GlassBackground
  content = content.replace(/import { GlassBackground } from '@\/components\/GlassBackground';\n?/g, '');
  content = content.replace(/<GlassBackground/g, '<View');
  content = content.replace(/<\/GlassBackground>/g, '</View>');

  // Make sure View is imported if not
  if (content.includes('<View') && !content.includes('View') && !content.includes('import { View')) {
    content = content.replace(/import React from 'react';/, "import React from 'react';\nimport { View } from 'react-native';");
  } else if (!content.match(/import\s+{[^}]*View[^}]*}\s+from\s+'react-native'/)) {
    content = content.replace(/import {([^}]+)} from 'react-native';/, "import { $1, View } from 'react-native';");
  }

  // Replace GlassContainer
  if (content.includes('GlassContainer')) {
    content = content.replace(/import { GlassContainer } from '@\/components\/GlassContainer';\n?/g, "import { Card } from '@/components/ui/Card';\n");
    content = content.replace(/<GlassContainer(\s+intensity=\{[^\}]+\})?/g, '<Card variant="elevated"');
    content = content.replace(/<\/GlassContainer>/g, '</Card>');
  }

  // Replace GlassButton
  if (content.includes('GlassButton')) {
    content = content.replace(/import { GlassButton } from '@\/components\/ui\/GlassButton';\n?/g, "import { Button } from '@/components/ui/Button';\n");
    content = content.replace(/<GlassButton/g, '<Button');
  }

  // Add background color to styles.container
  if (content.match(/container: \{/)) {
     if (!content.includes('backgroundColor: colors.dark.background')) {
       // Just let it inherit or we can add it. Let's add it.
       if (!content.includes('colors.dark.background')) {
         content = content.replace(/container: \{/, "container: {\n    backgroundColor: colors.dark.background,");
       }
     }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
