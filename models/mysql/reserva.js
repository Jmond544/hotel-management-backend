import { poll } from "./db_connection.js";
import { ModeloTipoServicio } from "./tipo_servicio.js";
import { ModeloHuesped } from "./huesped.js";
import { ModeloEstadoPago } from "./estado_pago.js";
import { ModeloReservaHabitacion } from "./reserva_habitacion.js";
import { ModeloHabitacion } from "./habitacion.js";
import { ModeloReservaHuesped } from "./reserva_huesped.js";

export class ReservationModel {
  static async getAll() {
    try {
      const result = await poll.query("SELECT * FROM RESERVA");
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async getById({ id }) {
    try {
      const result = await poll.query(
        "SELECT * FROM RESERVA WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async create({
    tipoServicio,
    fechaInicio,
    fechaFin,
    mailPago,
    telefonoPago,
    habitaciones,
    huespedes,
  }) {
    try {
      // Seccion de validaciones

      const validacionTipoServicio =
        await ModeloTipoServicio.validarTipoServicio({ tipoServicio });

      const validacionFechas = await ModeloReservaHabitacion.validarFechas({
        listaHabitaciones: habitaciones,
        fechaInicio,
        fechaFin,
      });

      const validacionHabitaciones =
        ModeloReservaHabitacion.validarHabitaciones({
          listaNumeroHabitaciones: habitaciones,
        });

      if (!validacionTipoServicio) {
        console.log("El tipo de servicio no es válido.");
        return { result: null, message: "El tipo de servicio no es válido." };
      }
      if (!validacionFechas) {
        console.log("Las fechas no son válidas");
        return {
          result: null,
          message: "Las fechas no son válidas, ya están reservadas.",
        };
      }
      if (!validacionHabitaciones) {
        return {
          result: null,
          message: "Las habitaciones no son válidas.",
        };
      }

      // Obtencion de IDs

      const idTipoServicio = await ModeloTipoServicio.getIdByName({
        name: tipoServicio,
      });

      const idEstadoPago = await ModeloEstadoPago.getIdByStatus({
        status: "pendiente",
      });

      const dateInicio = new Date(fechaInicio);
      const dateFin = new Date(fechaFin);

      const pagoTotal = await this.calcularMontoPago({
        fechaInicio: dateInicio,
        fechaFin: dateFin,
        tipoServicio,
        listaHabitaciones: habitaciones,
      });

      const numeroHuespedes = habitaciones.length;

      const result = await poll.query(
        "INSERT INTO RESERVA (id_tipo_servicio, id_estado_pago, fecha_inicio, fecha_fin, numero_huespedes, monto_pago, mail_pago, telefono_pago) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)",
        [
          idTipoServicio,
          idEstadoPago,
          dateInicio,
          dateFin,
          numeroHuespedes,
          pagoTotal,
          mailPago,
          telefonoPago,
        ]
      );

      // Recuperar el id de la reserva
      const idReserva = await poll.query(
        "SELECT BIN_TO_UUID(id) AS id FROM RESERVA ORDER BY fecha_creacion DESC LIMIT 1"
      );

      // Insertar las habitaciones reservadas
      for (let i = 0; i < habitaciones.length; i++) {
        const idHabitacion =
          await ModeloHabitacion.obtenerIdPorNumeroHabitacion({
            numeroHabitacion: habitaciones[i].numero,
          });
        const result_habitacion_reserva =
          await ModeloReservaHabitacion.crearRelacion({
            idReserva: idReserva[0][0].id,
            idHabitacion,
          });
      }

      // Insertar los huespedes
      for (let i = 0; i < huespedes.length; i++) {
        const idHuesped = await ModeloHuesped.create({
          name: huespedes[i].nombre,
          lastName: huespedes[i].apellido,
          dni: huespedes[i].dni,
          phone: huespedes[i].telefono,
          mail: huespedes[i].mail,
        });

        const result_huesped_reserva = await ModeloReservaHuesped.crearRelacion(
          {
            idReserva: idReserva[0][0].id,
            idHuesped,
          }
        );
      }

      return {
        result: result[0],
        message: "Se ha registrado la reserva.",
      };
    } catch (error) {
      console.log(error);
    }
  }

  static async calcularMontoPago({
    fechaInicio,
    fechaFin,
    tipoServicio,
    listaHabitaciones,
  }) {

    const daysReservation =
      Math.abs(fechaInicio - fechaFin) / (1000 * 60 * 60 * 24);
    const listaNumeroHabitaciones = listaHabitaciones.map(
      (habitacion) => habitacion.numero
    );
    const costoHabitaciones =
      await ModeloHabitacion.obtenerPrecioTotalHabitaciones({
        listaNumeroHabitaciones,
      });
    const costoServicio = await ModeloTipoServicio.obtenerPrecio({
      tipoServicio: tipoServicio,
    });
    return daysReservation * (costoHabitaciones + costoServicio);
  }

  static async update({ data, id }) {
    try {
      const result = await poll.query(
        "UPDATE RESERVA SET ? WHERE id = UUID_TO_BIN(?)",
        [data, id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  

  static async delete({ id }) {
    try {
      const result = await poll.query(
        "DELETE FROM RESERVA WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

