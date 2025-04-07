const fs = require("fs");
const path = require("path");

// list of HTML void elements
const voidElements = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"];

function cleanHTML(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      cleanHTML(fullPath);
    } else if (file.endsWith(".html")) {
      let html = fs.readFileSync(fullPath, "utf8");

      voidElements.forEach((tag) => {
        const regex = new RegExp(`<${tag}([^>]*)\\s*/>`, "gi");
        html = html.replace(regex, `<${tag}$1>`);
      });

      fs.writeFileSync(fullPath, html, "utf8");
      console.log(`✔ Cleaned: ${fullPath}`);
    }
  }
}

const outPath = path.join(__dirname, "out");
cleanHTML(outPath);
