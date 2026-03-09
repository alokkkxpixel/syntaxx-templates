import fs from "fs";
import path from "path";

export default function patch(projectPath) {
  const serverPath = path.join(projectPath, "server.js");

  if (!fs.existsSync(serverPath)) {
    console.warn(`Could not find ${serverPath}`);
    return;
  }

  let content = fs.readFileSync(serverPath, "utf8");

  // 1. Ensure cookie-parser is used
  if (!content.includes("cookieParser()")) {
    if (!content.includes("require('cookie-parser')")) {
      content = "const cookieParser = require('cookie-parser');\n" + content;
    }
    content = content.replace(
      "app.use(express.json());",
      "app.use(express.json());\napp.use(cookieParser());",
    );
  }

  // 2. Add secret if doesn't exist in .env (though usually done manually)
  const envPath = path.join(projectPath, ".env");
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, "utf8");
    if (!envContent.includes("JWT_SECRET=")) {
      envContent += "\nJWT_SECRET=supersecretkey\n";
      fs.writeFileSync(envPath, envContent, "utf8");
      console.log("✅ Added JWT_SECRET to .env");
    }
  }

  fs.writeFileSync(serverPath, content, "utf8");
  console.log("✅ Patched server.js with cookie-parser support");
}
