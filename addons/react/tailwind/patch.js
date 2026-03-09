import fs from "fs";
import path from "path";

export default function patch(projectPath) {
  const mainPath = path.join(projectPath, "src", "main.jsx");
  const viteConfigPath = path.join(projectPath, "vite.config.js");

  // 1. Add import './tailwind.css' to main.jsx
  if (fs.existsSync(mainPath)) {
    let mainContent = fs.readFileSync(mainPath, "utf8");
    if (!mainContent.includes("import './tailwind.css'")) {
      mainContent = "import './tailwind.css';\n" + mainContent;
      fs.writeFileSync(mainPath, mainContent, "utf8");
      console.log("✅ Added tailwind.css import to src/main.jsx");
    }
  }

  // 2. Add tailwindcss() plugin to vite.config.js
  if (fs.existsSync(viteConfigPath)) {
    let viteContent = fs.readFileSync(viteConfigPath, "utf8");
    let viteModified = false;

    // Add import if missing
    if (!viteContent.includes("import tailwindcss from '@tailwindcss/vite'")) {
      viteContent =
        "import tailwindcss from '@tailwindcss/vite';\n" + viteContent;
      viteModified = true;
    }

    // Add plugin to plugins array
    if (!viteContent.includes("tailwindcss()")) {
      viteContent = viteContent.replace(
        /plugins\s*:\s*\[/,
        "plugins: [\n    tailwindcss(),",
      );
      viteModified = true;
    }

    // Write once after all modifications
    if (viteModified) {
      fs.writeFileSync(viteConfigPath, viteContent, "utf8");
      console.log("✅ Added tailwindcss plugin to vite.config.js");
    }
  }
}
