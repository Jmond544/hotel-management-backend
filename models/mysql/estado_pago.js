import { poll } from "./db_connection.js";

export class PayStateModel {
  static async getIdByStatus({ status }) {
    try {
      const result = await poll.query(
        "SELECT BIN_TO_UUID(id) FROM ESTADO_PAGO WHERE estado = ?",
        [status]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}
