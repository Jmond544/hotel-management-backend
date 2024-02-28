import { Router } from "express";
import { ReservationController } from "../controllers/reservation.js";

export const reservationRouter = Router();

reservationRouter.get("/", ReservationController.getAll);

reservationRouter.get("/query", ReservationController.queryReserva);

reservationRouter.get("/:id", ReservationController.getOne);

reservationRouter.post("/", ReservationController.create);

// No se le deben de pasar los parámetros en el body, sino en la query string
// /query?tipoFiltro=numeroHabitacion&valor=1&fechaInicio=2021-10-01&fechaFin=2021-10-10
