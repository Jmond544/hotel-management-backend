import express, { json } from "express";
import cors from "cors";
import { DOMAIN_ACEPTED, PORT } from "./config.js";
import { roomRouter } from "./routes/room.routes.js";
import { reservationRouter } from "./routes/reservation.routes.js";
import { paymentRouter } from "./routes/payment.routes.js";
import { userRouter } from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (DOMAIN_ACEPTED === origin || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
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
