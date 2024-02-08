import { poll } from "./db_connection.js";

export class ModeloHabitacion {
  static async getAll() {
    try {
      const result = await poll.query(
        "SELECT numero_habitacion, tipo_habitacion, numero_piso, precio, estado FROM HABITACION"
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async getByNumberRoom({ number }) {
    try {
      const result = await poll.query(
        "SELECT numero_habitacion, tipo_habitacion, numero_piso, precio, estado FROM HABITACION WHERE numero_habitacion = ?",
        [number]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async getByTypeRoom({ type }) {
    try {
      const result = await poll.query(
        "SELECT numero_habitacion, tipo_habitacion, numero_piso, precio, estado FROM HABITACION WHERE tipo_habitacion = ?",
        [type]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async getByStatusRoom({ status }) {
    try {
      const result = await poll.query(
        "SELECT numero_habitacion, tipo_habitacion, numero_piso, precio, estado FROM HABITACION WHERE estado = ?",
        [status]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async updateStatus({ status, roomNumber }) {
    try {
      const result = await poll.query(
        "UPDATE HABITACION SET estado = ? WHERE numero_habitacion = ?",
        [status, roomNumber]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async obtenerIdPorNumeroHabitacion({ numeroHabitacion }) {
    try {
      const result = await poll.query(
        "SELECT BIN_TO_UUID(id) AS id FROM HABITACION WHERE numero_habitacion = ?",
        [numeroHabitacion]
      );
      return result[0][0].id;
    } catch (error) {
      console.log(error);
    }
  }

  static async validarTipoHabitacion({ tipoHabitacion }) {
    try {
      const result = await poll.query(
        "SELECT * FROM HABITACION WHERE tipo_habitacion = ?",
        [tipoHabitacion]
      );
      return result[0].length > 0;
    } catch (error) {
      console.log(error);
    }
  }

  static async validarNumeroHabitacion({ numeroHabitacion }) {
    try {
      const result = await poll.query(
        "SELECT * FROM HABITACION WHERE numero_habitacion = ?",
        [numeroHabitacion]
      );
      return result[0].length > 0;
    } catch (error) {
      console.log(error);
    }
  }

  static async obtenerPrecioTotalHabitaciones({ listaNumeroHabitaciones }) {
    try {
      const result = await poll.query(
        "SELECT SUM(precio) AS precio FROM HABITACION WHERE numero_habitacion IN (?)",
        [listaNumeroHabitaciones]
      );
      return result[0][0].precio;
    } catch (error) {
      console.log(error);
    }
  }
}
