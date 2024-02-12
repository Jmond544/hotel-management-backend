import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 4000;
export const HOST = process.env.HOST || `http://localhost:${PORT}`;
export const DOMAIN_ACEPTED =
  process.env.DOMAIN_ACEPTED || "http://localhost:5173";

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "p1n3d4";
export const DB_NAME = process.env.DB_NAME || "hotel";
export const DB_PORT = process.env.DB_PORT || 3306;
export const SECRET_KEY = process.env.SECRET_KEY || "secretkey";
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = "https://api-m.sandbox.paypal.com";
