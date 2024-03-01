import { ReservationModel } from "../models/mysql/reserva.js";
import { ModeloReservaHabitacion } from "../models/mysql/reserva_habitacion.js";
import { ModeloHabitacion } from "../models/mysql/habitacion.js";
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

  static async delete(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const result = await ReservationModel.delete({ id });
      if (!result.result) {
        res.status(400).json({ message: result.message });
      } else {
        res.status(200).json({ message: "Reservation deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async queryReserva(req, res) {
    try {
      const { tipoFiltro, valor, fechaInicio, fechaFin } = req.query;
      if (!tipoFiltro || !valor || !fechaInicio || !fechaFin) {
        res.status(400).json({ message: "Invalid fields" });
        return;
      }
      const reservations = await ReservationModel.queryReserva({
        tipoFiltro,
        valor,
        fechaInicio,
        fechaFin,
      });
      res.status(200).json(reservations);
    } catch (error) {
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

  static async updatePaymentStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!status) {
        res.status(400).json({ message: "Invalid fields" });
        return;
      }
      const result = await ReservationModel.updatePaymentStatus({ id, status });
      if (!result.result) {
        res.status(400).json({ message: result.message });
      } else {
        res.status(200).json({ message: "Payment status updated" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateReservation(req, res) {
    try {
      const { id } = req.params;
      const {
        tipoServicio,
        fechaInicio,
        fechaFin,
        mailPago,
        telefonoPago,
        habitaciones,
      } = req.body;

      if (
        !tipoServicio ||
        !fechaInicio ||
        !fechaFin ||
        !mailPago ||
        !telefonoPago ||
        habitaciones.length <= 0
      ) {
        res.status(400).json({ message: "Invalid fields" });
        return;
      }

      const monto_pago = await ReservationController.obtenerPrecio({
        fechaInicio,
        fechaFin,
        tipoServicio,
        listaHabitaciones: habitaciones,
      });

      const resultCreate = await ReservationModel.update({
        id,
        tipoServicio,
        fechaInicio,
        fechaFin,
        mailPago,
        telefonoPago,
        habitaciones,
        montoPago: monto_pago,
      });

      if (!resultCreate) {
        res.status(400).json({ message: resultCreate.message });
      } 
      if (resultCreate.affectedRows === 0) {
        res.status(400).json({ message: "Reservation not found" });
      } else if (resultCreate.affectedRows !== 1) {
        res.status(400).json({ message: "Error" });
      }

      let status = true;
      const deletedHabitaciones =
        await ModeloReservaHabitacion.deleteByIdReserva({
          idReserva: id,
        });
        status = status && deletedHabitaciones.affectedRows > 0;
      if (deletedHabitaciones.affectedRows > 0) {
        for (let i = 0; i < habitaciones.length; i++) {
          const idHabitacion =
            await ModeloHabitacion.obtenerIdPorNumeroHabitacion({
              numeroHabitacion: habitaciones[i].numero,
            });
          const result_habitacion_reserva =
            await ModeloReservaHabitacion.crearRelacion({
              idReserva: id,
              idHabitacion,
            });
          status = result_habitacion_reserva.affectedRows > 0 && status;
        }
      } else {
        status = false;
      }
      if (status) {
        res.status(200).json({ message: "Reservation updated" });
      } else {
        res.status(400).json({ message: "Error" });
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}
