import express, { json } from "express";
import cors from "cors";
import { roomRouter } from "./routes/room.routes.js";
import { reservationRouter } from "./routes/reservation.routes.js";
import { paymentRouter } from "./routes/payment.routes.js";
import { userRouter } from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://dolphin-hotel.vercel.app",
        "https://dolphin-hotel-i4y8kmbc4-juan-carlos-projects-ef7414da.vercel.app",
        "https://dolphin-hotel-git-main-juan-carlos-projects-ef7414da.vercel.app",
      ];
      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(json());
app.disable("x-powered-by");

app.use("/api/room", roomRouter);
app.use("/api/reservation", reservationRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
