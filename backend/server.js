import express from "express";
import cors from "cors";
import productRoutes from "./routes/ProductRoute.js";
import productSlide from './routes/ProductSlider.js'
import trustBadgesRoute from "./routes/TrustBadgeRoute.js";
import connectdb from "./config/connectdb.js";
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//database connected
connectdb()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // React admin panel port
    credentials: true,
  })
);

app.use("/api", productRoutes);
app.use("/api", productSlide);
app.use("/api", trustBadgesRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
