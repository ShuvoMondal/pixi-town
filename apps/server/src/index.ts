import { auth } from "@pixi-town/auth";
import { env } from "@pixi-town/env/server";
import { toNodeHandler} from "better-auth/node";
import router from "./routes";
import cors from "cors";
import express from "express";
import requiredAuth from "./middleware/auth";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.all("/api/auth{/*path}", toNodeHandler(auth));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/api", requiredAuth, router);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
