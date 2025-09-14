import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { router as notesRouter } from "./routes/notes.js";
import { setupSwagger } from "./swagger.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const API_PREFIX = process.env.API_PREFIX || "/api";

app.use(cors());
app.use(express.json());
app.use(logger);

app.use(`${API_PREFIX}/notes`, notesRouter);

setupSwagger(app);

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
