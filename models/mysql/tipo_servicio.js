import { poll } from "./db_connection.js";

export class ModeloTipoServicio {
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
      return result[0][0].id;
    } catch (error) {
      console.log(error);
    }
  }

  static async validarTipoServicio({ tipoServicio }) {
    try {
      const result = await poll.query(
        "SELECT * FROM TIPO_SERVICIO WHERE nombre = ?",
        [tipoServicio]
      );
      return result[0].length > 0;
    } catch (error) {
      console.log(error);
    }
  }

  static async obtenerPrecio({ tipoServicio }) {
    try {
      const result = await poll.query(
        "SELECT precio FROM TIPO_SERVICIO WHERE nombre = ?",
        [tipoServicio]
      );
      return result[0][0].precio;
    } catch (error) {
      console.log(error);
    }
  }
}
