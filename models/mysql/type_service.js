import { poll } from "./db_connection.js";

export class Type_Service_Model {
  static async getById({ id }) {
    try {
      const result = await poll.query(
        "SELECT * FROM TIPO_SERVICIO WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async getIdByName({ name }) {
    try {
      const result = await poll.query(
        "SELECT BIN_TO_UUID(id) AS id FROM TIPO_SERVICIO WHERE nombre = ?",
        [name]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}
