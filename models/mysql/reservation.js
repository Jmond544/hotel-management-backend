import { poll } from "./db_connection.js";
import { Type_Service_Model } from "./type_service.js";

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

  static async create({ service, data }) {
    try {
      const idService = Type_Service_Model.getByName({ name: service });
      const result = await poll.query("INSERT INTO RESERVA SET ?", [data]);
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
