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

  static async getOne({ id }) {
    try {
      const result = await poll.query(
        "SELECT * FROM HABITACION WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async updateStatus({ status, id }) {
    try {
      const result = await poll.query(
        "UPDATE HABITACION SET estado = ? WHERE id = UUID_TO_BIN(?)",
        [status, id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}
