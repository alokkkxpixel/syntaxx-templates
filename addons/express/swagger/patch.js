import fs from "fs";
import path from "path";

export default function patch(projectPath) {
  const serverPath = path.join(projectPath, "server.js");

  if (!fs.existsSync(serverPath)) return;

  let content = fs.readFileSync(serverPath, "utf8");

  // 1. Add import
  if (!content.includes("require('./swagger')")) {
    content = "const setupSwagger = require('./swagger');\n" + content;
  }

  // 2. Add setup call after app initialization
  if (!content.includes("setupSwagger(app)")) {
    content = content.replace(
      "const app = express();",
      "const app = express();\nsetupSwagger(app);",
    );
  }

  fs.writeFileSync(serverPath, content, "utf8");
  console.log("✅ Patched server.js with Swagger docs setup");
}
