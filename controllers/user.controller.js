import { ModeloUsuarioInterno } from "../models/mysql/usuario_interno.js";
import md5 from "md5";
import { RESEND_API_SECRET } from "../config.js";
import { Resend } from "resend";
import cryptoRandomString from "crypto-random-string";

const resend = new Resend(RESEND_API_SECRET);

export class UserController {
  static async login(req, res) {
    try {
      const { mail, password } = req.body;
      const password_cifrado = md5(password);
      const user = await ModeloUsuarioInterno.obtenerUsuario({
        mail,
        password: password_cifrado,
      });
      if (!user) {
        res.status(401).json({ error: "Usuario o contraseña invalidos" });
        return;
      }
      // Token de verificación

      const token = cryptoRandomString({ length: 6, type: "distinguishable" });

      const fecha_creacion_codigo = new Date();

      const updateState = await ModeloUsuarioInterno.actualizarCodigoTemporal({
        mail,
        codigo_temporal: token,
        fecha_creacion_codigo,
      });

      if (updateState.affectedRows === 0) {
        return res
          .status(500)
          .json({ error: "No se pudo actualizar el código" });
      }

      const { data, error } = await resend.emails.send({
        from: "Dolphin Hotel <recepcion@resend.dev>",
        to: [mail],
        subject: "Código de verificación",
        html: `<strong>Tu código de verificación es: ${token}</strong>`,
      });
      if (error) {
        return res.status(400).json({ error });
      }

      res.status(200).json({
        message: "Se ha enviado un código de verificación a tu correo",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async verifyCode(req, res) {
    try {
      const { mail, codigo } = req.body;
      const user = await ModeloUsuarioInterno.obtenerCodigoTemporal({ mail });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      if (user.codigo_temporal !== codigo) {
        return res.status(401).json({ error: "Código incorrecto" });
      }

      const fecha_creacion_codigo = new Date(user.fecha_creacion_codigo);
      const fecha_actual = new Date();
      const diferencia = fecha_actual - fecha_creacion_codigo;
      const diferencia_minutos = Math.floor(diferencia / 60000);
      if (diferencia_minutos > 1) {
        return res.status(401).json({ error: "El código ha expirado" });
      }

      res.status(200).json({ message: "Usuario verificado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async register(req, res) {
    try {
      const {
        rol,
        nombres,
        apellidos,
        dni,
        telefono,
        mail,
        password,
        url_imagen,
      } = req.body;
      const password_cifrado = md5(password);
      const user = await ModeloUsuarioInterno.crearUsuario({
        rol,
        nombres,
        apellidos,
        dni,
        telefono,
        mail,
        password: password_cifrado,
        url_imagen,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
