import fs from "fs-extra";
import path from "path";

export default async function patch(projectDir) {
  const cssPath = path.join(projectDir, "src", "index.css");
  const viteConfigPath = path.join(projectDir, "vite.config.js");
  const pkgPath = path.join(projectDir, "package.json");

  /* ---------------------------------- */
  /* 1️⃣ Ensure src/index.css exists     */
  /* ---------------------------------- */

  if (!(await fs.pathExists(cssPath))) {
    await fs.ensureFile(cssPath);
    console.log("✅ Created src/index.css");
  }

  let cssContent = await fs.readFile(cssPath, "utf8");

  if (!cssContent.includes('@import "tailwindcss"')) {
    cssContent = `@import "tailwindcss";\n` + cssContent;
    await fs.writeFile(cssPath, cssContent);
    console.log("✅ Tailwind CSS added to index.css");
  }

  /* ---------------------------------- */
  /* 2️⃣ Modify vite.config.js           */
  /* ---------------------------------- */

  if (await fs.pathExists(viteConfigPath)) {
    let viteContent = await fs.readFile(viteConfigPath, "utf8");
    let modified = false;

    // Add import
    if (!viteContent.includes("@tailwindcss/vite")) {
      viteContent =
        `import tailwindcss from "@tailwindcss/vite";\n` + viteContent;
      modified = true;
    }

    // Add plugin
    if (!viteContent.includes("tailwindcss()")) {
      viteContent = viteContent.replace(
        /plugins\s*:\s*\[/,
        "plugins: [\n    tailwindcss(),"
      );
      modified = true;
    }

    if (modified) {
      await fs.writeFile(viteConfigPath, viteContent);
      console.log("✅ Tailwind plugin added to vite.config.js");
    }
  } else {
    console.log("⚠️ vite.config.js not found");
  }

  /* ---------------------------------- */
  /* 3️⃣ Add dependencies to package.json*/
  /* ---------------------------------- */

  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);

    pkg.devDependencies = pkg.devDependencies || {};

    if (!pkg.devDependencies["tailwindcss"]) {
      pkg.devDependencies["tailwindcss"] = "^4.0.0";
    }

    if (!pkg.devDependencies["@tailwindcss/vite"]) {
      pkg.devDependencies["@tailwindcss/vite"] = "^4.0.0";
    }

    await fs.writeJson(pkgPath, pkg, { spaces: 2 });

    console.log("✅ Tailwind dependencies added to package.json");
  }

  console.log("\n🎉 Tailwind CSS v4 setup complete!\n");
}
