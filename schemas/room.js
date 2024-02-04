import z from "zod";

const roomSchemaState = z.object({
  estado: z.enum(["disponible", "ocupada", "limpieza"]),
});

export function validateRoomState(state) {
  return roomSchemaState.parse(state);
}