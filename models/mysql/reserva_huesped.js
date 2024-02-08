import { poll } from "./db_connection.js";

export class ModeloReservaHuesped {
  static async crearRelacion({ idReserva, idHuesped }) {
    try {
      const resultado = await poll.query(
        "INSERT INTO RESERVA_HUESPED (id_reserva, id_huesped) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?))",
        [idReserva, idHuesped]
      );
      return resultado[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async 
}
