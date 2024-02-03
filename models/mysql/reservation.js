import { poll } from "./db.js";

export class ReservationModel {
  static async getAll() {
    try {
      const result = await poll.query("SELECT * FROM RESERVA");
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async getOne(id) {
    try {
      const result = await poll.query("SELECT * FROM RESERVA WHERE id = ?", [
        id,
      ]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async create(data) {
    try {
      const result = await poll.query("INSERT INTO RESERVA SET ?", [data]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async update(data, id) {
    try {
      const result = await poll.query("UPDATE RESERVA SET ? WHERE id = ?", [
        data,
        id,
      ]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    try {
      const result = await poll.query("DELETE FROM RESERVA WHERE id = ?", [id]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}
