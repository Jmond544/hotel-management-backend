import { poll } from "./db_connection.js";
import { ModeloHabitacion } from "./habitacion.js";

export class ModeloReservaHabitacion {
  static async crearRelacion({ idReserva, idHabitacion }) {
    try {
      const resultado = await poll.query(
        "INSERT INTO RESERVA_HABITACION (id_reserva, id_habitacion) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?))",
        [idReserva, idHabitacion]
      );
      return resultado[0];
    } catch (error) {
      console.log(error);
    }
  }
  /*
static async obtenerPrecioTotalHabitaciones({ idReserva }) {
  try {
    const resultado = await poll.query(
      "SELECT SUM(precio) AS precio_total FROM HABITACION WHERE id IN (SELECT id_habitacion FROM RESERVA_HABITACION WHERE id_reserva = UUID_TO_BIN(?))",
      [idReserva]
      );
      return resultado[0].precio_total;
    } catch (error) {
      console.log(error);
    }
  }
  */

  static async validarFechas({ idHabitacion, fechaInicio, fechaFin }) {
    //TODO: Validar que el intervalo de las fechas no se superponga con las fechas de otras reservas
    try {

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  static async validarHabitaciones({ listaNumeroHabitaciones }) {
    try {
      for (let i = 0; i < listaNumeroHabitaciones.length; i++) {
        const resultado = await ModeloHabitacion.validarNumeroHabitacion({
          number: listaNumeroHabitaciones[i],
        });
        if (!resultado) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
