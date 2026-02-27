import { config } from "dotenv";

config();

export function loadEnv() {
  if (!process.env.PORT) {
    console.warn("⚠️  PORT not defined in .env, using default");
  }
}
