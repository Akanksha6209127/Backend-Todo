
import http from "http";
import app from "./app";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  //  Debug environment variables
 

  await connectDB();

  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error(" Failed to start:", err);
  process.exit(1);
});
