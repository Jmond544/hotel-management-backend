import {
  HOST,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
  PAYPAL_API,
} from "../config.js";
import axios from "axios";
import {ReservationController} from "./reservation.js"

export class PaymentController {
  static async createOrder(req, res) {
    try {
      const data = req.body;
      const {statusOperation} = ReservationController.verificarCampos({ data });
      if (!statusOperation) {
        res.status(400).json({ message: "Invalid fields" });
        return;
      }
      const monto = await ReservationController.obtenerPrecio({
        fechaFin: data.fechaFin,
        fechaInicio: data.fechaInicio,
        listaHabitaciones: data.habitaciones,
        tipoServicio: data.tipoServicio,
      });

      const montoString = monto.toString();
      const order = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: montoString,
            },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              brand_name: "my company.com",
              landing_page: "NO_PREFERENCE",
              user_action: "PAY_NOW",
              return_url: `${HOST}/api/payment/capture-order`,
              cancel_url: `${HOST}/api/payment/cancel-order`,
            },
          },
        },
      };

      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");

      const {
        data: { access_token },
      } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      });

      // make a request
      const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders`,
        order,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async captureOrder(req, res) {
    try {
      const { token } = req.query;

      const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
          },
        }
      );

      console.log(response);

      res.status(200).json({ message: "Payed" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async cancelOrder(req, res) {
    try {
      res.status(200).json({ message: "Payment canceled" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
