import z from "zod";

export const huespedSchema = z.object({
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



