import { poll } from "./db_connection.js";

export class RoomModel {
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

  static async updateStatus({ status, roomNumber}) {
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
}
