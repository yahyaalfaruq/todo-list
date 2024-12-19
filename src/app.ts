import express from "express";
import taskManager from "./routes/task";
import register from './routes/register';

const app = express();

// Middleware
app.use(express.json());
app.use("/api/task", taskManager);
app.use("/auth", register);

// Port Server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
