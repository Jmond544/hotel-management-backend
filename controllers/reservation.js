import { ReservationModel } from "../models/mysql/reserva.js";
import { ModeloReservaHabitacion } from "../models/mysql/reserva_habitacion.js";
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

      if (
        !tipoServicio ||
        !fechaInicio ||
        !fechaFin ||
        !mailPago ||
        !telefonoPago ||
        habitaciones.length <= 0 ||
        huespedes.length <= 0
      ) {
        res.status(400).json({ message: "Invalid fields" });
        return;
      }

      const { statusOperation } = await ReservationController.verificarCampos({
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

      console.log(statusOperation);
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

  static async verificarCampos({ data }) {
    try {
      const validacionFechas = await ModeloReservaHabitacion.validarFechas({
        fechaFin: data.fechaFin,
        fechaInicio: data.fechaInicio,
        listaHabitaciones: data.habitaciones,
      });
      if (!validacionFechas) {
        return {
          statusOperation: false,
          message: "Fechas invalidas, ya hay una reserva en ese intervalo.",
        };
      }

      const reservation = validateReservation({ reservation: data });
      return { statusOperation: true, reservation };
    } catch (error) {
      const message = error.errors.map((error) => {
        return { message: error.message, path: error.path };
      });
      return { statusOperation: false, message };
    }
  }

  static async obtenerPrecio({
    fechaInicio,
    fechaFin,
    tipoServicio,
    listaHabitaciones,
  }) {
    fechaFin = new Date(fechaFin);
    fechaInicio = new Date(fechaInicio);
    const response = await ReservationModel.calcularMontoPago({
      fechaInicio,
      fechaFin,
      tipoServicio,
      listaHabitaciones,
    });
    return response;
  }
}
