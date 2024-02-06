import { poll } from "./db_connection.js";
import { Type_Service_Model } from "./type_service.js";
import { GuestModel } from "./guest.js";

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
      const idTipoServicio = await Type_Service_Model.getIdByName({
        name: tipoServicio,
      });
      const idEstadoPago = await poll.query(
        "SELECT BIN_TO_UUID(id) AS id FROM ESTADO_PAGO WHERE estado = 'pendiente'"
      );
      if (!idTipoServicio || !idEstadoPago[0]) {
        console.log("No se encontró el tipo de servicio o el estado de pago");
        return null;
      }

      const dateInicio = new Date(fechaInicio);
      const dateFin = new Date(fechaFin);
      const daysReservation =
        Math.abs(dateFin - dateInicio) / (1000 * 60 * 60 * 24);
      // TODO: Calcular el monto de pago
      const pago = daysReservation * 1000;

      const numeroHuespedes = habitaciones.length;

      const result = await poll.query(
        "INSERT INTO RESERVA (id_tipo_servicio, id_estado_pago, fecha_inicio, fecha_fin, numero_huespedes, monto_pago, mail_pago, telefono_pago) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)",
        [
          idTipoServicio[0].id,
          idEstadoPago[0][0].id,
          dateInicio,
          dateFin,
          numeroHuespedes,
          pago,
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
        const idHabitacion = await poll.query(
          "SELECT BIN_TO_UUID(id) AS id FROM HABITACION WHERE numero_habitacion = ?",
          [habitaciones[i]["numero"]]
        );
        const result_habitacion_reserva = await poll.query(
          "INSERT INTO RESERVA_HABITACION (id_reserva, id_habitacion) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?))",
          [idReserva[0][0].id, idHabitacion[0][0].id]
        );
      }

      // Insertar los huespedes
      for (let i = 0; i < huespedes.length; i++) {
        const result_huesped = await GuestModel.create({
          name: huespedes[i].nombre,
          lastName: huespedes[i].apellido,
          dni: huespedes[i].dni,
          phone: huespedes[i].telefono,
          mail: huespedes[i].mail,
        });

        const idHuesped = await poll.query(
          "SELECT BIN_TO_UUID(id) AS id FROM HUESPED WHERE dni = ?",
          [huespedes[i].dni]
        );
        const result_huesped_reserva = await poll.query(
          "INSERT INTO RESERVA_HUESPED (id_reserva, id_huesped) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?))",
          [idReserva[0][0].id, idHuesped[0][0].id]
        );
      }

      return result[0];
    } catch (error) {
      console.log(error);
    }
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
