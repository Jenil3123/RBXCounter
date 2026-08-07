const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\hooks\\use-theme.ts",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\features\\splash\\screens\\SplashScreen.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\components\\GlassBackground.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\components\\themed-view.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(setup)\\onboarding-2.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\components\\themed-text.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(setup)\\onboarding-1.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\components\\ui\\collapsible.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(setup)\\language.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(setup)\\character.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\components\\hint-row.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(setup)\\customization.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\components\\GlassContainer.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(main)\\_layout.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(main)\\settings.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(main)\\rewards.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(main)\\profile.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(main)\\index.tsx",
  "d:\\Antigravity\\RBXCounter\\RBXCounter\\src\\app\\(main)\\games.tsx"
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/@\/constants\/theme/g, '@/theme');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
