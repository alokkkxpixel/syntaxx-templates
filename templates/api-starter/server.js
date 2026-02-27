import app from "./src/app.js";
import { loadEnv } from "./src/utils/env.js";

loadEnv();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
