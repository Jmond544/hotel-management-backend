import { Router } from "express";
import { ReservationController } from "../controllers/reservation.js";

export const reservationRouter = Router();

reservationRouter.get("/", ReservationController.getAll);
reservationRouter.get("/:id", ReservationController.getOne);

reservationRouter.post("/", ReservationController.create);
