import { poll } from "./db_connection.js";

export class GuestModel {
  static async getAll() {
    try {
      const result = await poll.query("SELECT * FROM HUESPED");
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async getOneById({ id }) {
    try {
      const result = await poll.query(
        "SELECT * FROM HUESPED WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async getOneByDNINumber({ dniNumber }) {
    try {
      const result = await poll.query("SELECT * FROM HUESPED WHERE dni = ?", [
        dniNumber,
      ]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async create({ data }) {
    try {
      const result = await poll.query("INSERT INTO HUESPED SET ?", [data]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async update({ data, id }) {
    try {
      const result = await poll.query(
        "UPDATE HUESPED SET ? WHERE id = UUID_TO_BIN(?)",
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
        "DELETE FROM HUESPED WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}
