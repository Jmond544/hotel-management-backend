import e from "cors";
import { ReservationModel } from "../models/mysql/reserva.js";
import { validateReservation } from "../schemas/reserva.js";

export class ReservationController {
  static async getAll(req, res) {
    try {
      const reservations = await ReservationModel.getAll();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const reservation = await ReservationModel.getById({ id });
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const {
        tipoServicio,
        fechaInicio,
        fechaFin,
        mailPago,
        telefonoPago,
        habitaciones,
        huespedes,
      } = req.body;
      
      const { statusOperation } = ReservationController.verificarCampos({
        data: {
          tipoServicio,
          fechaInicio,
          fechaFin,
          mailPago,
          telefonoPago,
          habitaciones,
          huespedes,
        },
      });
      if (!statusOperation) {
        res.status(400).json({ message: "Invalid fields" });
        return;
      }
      const resultCreate = await ReservationModel.create({
        tipoServicio,
        fechaInicio,
        fechaFin,
        mailPago,
        telefonoPago,
        habitaciones,
        huespedes,
      });

      if (!resultCreate.result) {
        res.status(400).json({ message: resultCreate.message });
      } else {
        res.status(200).json({ message: "Reservation created" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

  static verificarCampos({ data }) {
    try {
      const reservation = validateReservation({ reservation: data });
      return { statusOperation: true, reservation };
    } catch (error) {
      const message = error.errors.map((error) => {
        return { message: error.message, path: error.path };
      });
      console.log(message);
      return { statusOperation: false, message };
    }
  }

}
