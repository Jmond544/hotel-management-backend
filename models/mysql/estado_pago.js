import { poll } from "./db_connection.js";

export class ModeloEstadoPago {
  static async getIdByStatus({ status }) {
    try {
      const result = await poll.query(
        "SELECT BIN_TO_UUID(id) AS id FROM ESTADO_PAGO WHERE estado = ?",
        [status]
      );
      return result[0][0].id;
    } catch (error) {
      console.log(error);
    }
  }
}
