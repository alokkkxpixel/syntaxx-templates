import fs from "fs";
import path from "path";

export default function patch(projectPath) {
  const mainPath = path.join(projectPath, "src", "main.jsx");

  if (!fs.existsSync(mainPath)) {
    console.error(`Could not find ${mainPath}`);
    return;
  }

  let content = fs.readFileSync(mainPath, "utf8");

  // 1. Add import
  if (!content.includes('import { AppProvider } from "./context/AppContext"')) {
    content = 'import { AppProvider } from "./context/AppContext";\n' + content;
  }

  // 2. Wrap <App /> with <AppProvider>
  if (content.includes("<App />") && !content.includes("<AppProvider>")) {
    content = content.replace(
      "<App />",
      "<AppProvider>\n    <App />\n  </AppProvider>",
    );
  }

  fs.writeFileSync(mainPath, content, "utf8");
  console.log("✅ Patched src/main.jsx with AppProvider");
}
