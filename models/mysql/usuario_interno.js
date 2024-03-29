import { poll } from "./db_connection.js";

export class ModeloUsuarioInterno {
  static async obtenerUsuarioPorId({ id }) {
      const resultado = await poll.query(
        "SELECT rol, nombres, apellidos, dni, url_imagen, telefono, mail FROM USUARIO_INTERNO WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return resultado[0][0];
  }

  static async obtenerUsuario({ mail, password }) {
    try {
      const resultado = await poll.query(
        "SELECT rol, nombres, apellidos, dni, url_imagen, telefono, mail, codigo_temporal FROM USUARIO_INTERNO WHERE mail = ? AND password = ?",
        [mail, password]
      );
      return resultado[0][0];
    } catch (error) {
      console.log(error);
    }
  }

  static async actualizarCodigoTemporal({
    mail,
    codigo_temporal,
    fecha_creacion_codigo,
  }) {
    const resultado = await poll.query(
      "UPDATE USUARIO_INTERNO SET codigo_temporal = ?, fecha_creacion_codigo = ? WHERE mail = ?",
      [codigo_temporal, fecha_creacion_codigo, mail]
    );
    return resultado[0];
  }

  static async obtenerCodigoTemporal({ mail, password }) {
    const resultado = await poll.query(
      "SELECT BIN_TO_UUID(id) AS id, codigo_temporal, fecha_creacion_codigo FROM USUARIO_INTERNO WHERE mail = ? AND password = ?",
      [mail, password]
    );
    return resultado[0][0];
  }

  static async crearUsuario({
    rol,
    nombres,
    apellidos,
    dni,
    telefono,
    mail,
    password,
    url_imagen,
  }) {
    const resultado = await poll.query(
      "INSERT INTO USUARIO_INTERNO (rol, nombres, apellidos, dni, telefono, mail, password, url_imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [rol, nombres, apellidos, dni, telefono, mail, password, url_imagen]
    );
    return resultado[0];
  }

  static async actualizarPassword ({id, password}) {
    const resultado = await poll.query("UPDATE USUARIO_INTERNO SET password = ? WHERE id = UUID_TO_BIN(?)", [password, id]);
    return resultado[0];
  }
}
