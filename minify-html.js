const fs = require("fs");
const path = require("path");
const { minify } = require("html-minifier");


const OUT_DIR = path.join(__dirname, "out");


const minifyOptions = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  minifyCSS: true,
  minifyJS: true,
};

function walkAndMinify(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      walkAndMinify(filepath); 
    } else if (file.endsWith(".html")) {
      const originalHtml = fs.readFileSync(filepath, "utf8");
      const minifiedHtml = minify(originalHtml, minifyOptions);
      fs.writeFileSync(filepath, minifiedHtml, "utf8");
      console.log(`✅ Minified: ${filepath}`);
    }
  });
}

walkAndMinify(OUT_DIR);
