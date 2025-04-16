const fs = require("fs");
const path = require("path");

// Root directory to start scanning (e.g., your src/ folder)
const rootDir = path.join(__dirname, "src");

// Recursively find all `.css` files
function getAllCSSFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getAllCSSFiles(fullPath);
    } else if (entry.isFile() && fullPath.endsWith(".css")) {
      return [fullPath];
    } else {
      return [];
    }
  });
}

// Remove comments from a CSS file
function removeCommentsFromCSS(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const cleaned = content.replace(/\/\*[\s\S]*?\*\//g, "").trim();
  fs.writeFileSync(filePath, cleaned, "utf8");
  console.log(`✅ Cleaned: ${filePath}`);
}

// Run the cleanup
const cssFiles = getAllCSSFiles(rootDir);

cssFiles.forEach(removeCommentsFromCSS);

console.log("🎉 All CSS comments removed!");
