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
  
  static async deleteByIdReserva ({idReserva}) {
    try {
      const resultado = await poll.query(
        "DELETE FROM RESERVA_HABITACION WHERE id_reserva = UUID_TO_BIN(?)",
        [idReserva]
      );
      return resultado[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async validarFechas({ listaHabitaciones, fechaInicio, fechaFin }) {
    try {
      const listaNumeroHabitaciones = listaHabitaciones.map(
        (habitacion) => habitacion.numero
      );
      for (let i = 0; i < listaNumeroHabitaciones.length; i++) {
        const resultado = await ModeloHabitacion.validarFechasHabitacion({
          idHabitacion: await ModeloHabitacion.obtenerIdPorNumeroHabitacion({
            numeroHabitacion: listaNumeroHabitaciones[i],
          }),
          fechaInicio,
          fechaFin,
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
