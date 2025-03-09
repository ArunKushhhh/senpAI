import "dotenv/config";
import http from "http";
import app from "./app.js";

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});
