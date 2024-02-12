import z from "zod";

const huespedSchema = z.object({
  nombre: z
    .string()
    .max(40, { message: "El nombre debe tener como máximo 40 caracteres." }),
  apellido: z
    .string()
    .max(40, { message: "El apellido debe tener como máximo 40 caracteres." }),
  dni: z
    .string()
    .length(8, { message: "El número de DNI debe tener 8 dígitos." }),
  telefono: z
    .string()
    .length(9, { message: "El número de teléfono debe tener 9 dígitos." }),
  mail: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida.",
  }),
});

const habitacionSchema = z.object({
  numero: z
    .string()
    .length(4, { message: "El número de habitación debe tener 4 dígitos." }),
});

const reservaSchema = z.object({
  tipoServicio: z.string().max(10, {
    message: "El tipo de servicio debe tener maximo 10 caracteres.",
  }),
  fechaInicio: z.string().refine(
    (value) => {
      // Expresión regular para verificar el formato de fecha (YYYY-MM-DD)
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    },
    {
      message: "El formato de fecha de inicio debe ser YYYY-MM-DD.",
    }
  ),
  fechaFin: z.string().refine(
    (value) => {
      // Expresión regular para verificar el formato de fecha (YYYY-MM-DD)
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    },
    {
      message:
        "El formato de fecha de fin debe ser YYYY-MM-DD y debe ser igual o posterior a la fecha de inicio.",
    }
  ),
  mailPago: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida.",
  }),
  telefonoPago: z.string().length(9, {
    message: "El número de teléfono debe tener exactamente 9 dígitos.",
  }),
  habitaciones: z.array(habitacionSchema),
  huespedes: z.array(huespedSchema),
});

export function validateReservation({ reservation }) {
  return reservaSchema.parse(reservation);
}
