import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./routes/api.js";
import webRouter from "./routes/web.js";
import os from "os";
dotenv.config();
const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/healthz", (req, res) => {
   const systemUptime = os.uptime();       
  const appUptime = process.uptime();     
  const data = {
    system: {
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus().length,
      cpuModel: os.cpus()[0].model,
      totalMemory: (os.totalmem() / 1024 / 1024).toFixed(2) + " MB",
      freeMemory: (os.freemem() / 1024 / 1024).toFixed(2) + " MB",
      loadAverage: os.loadavg(),
      systemUptime: systemUptime + " seconds",
    },
    app: {
      appUptime: appUptime + " seconds",
      memoryUsage: process.memoryUsage(),
      nodeVersion: process.version,
      env: process.env.NODE_ENV || "development",
    },
  };
  res.json(data);
});

app.use("/api", apiRouter);

app.use(express.static("public"));

app.use("/redirect", webRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => 
console.log(`Server running on ${port}`)
);
