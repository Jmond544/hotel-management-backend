import { ReservationModel } from "../models/mysql/reserva.js";

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
      await ReservationModel.create({
        tipoServicio,
        fechaInicio,
        fechaFin,
        mailPago,
        telefonoPago,
        habitaciones,
        huespedes,
      });
      res.status(200).json({ message: "Reservation created" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
