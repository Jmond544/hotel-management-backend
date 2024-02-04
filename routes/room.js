import { Router } from "express";

import { RoomController } from "../controllers/room.js";

export const roomRouter = Router();

roomRouter.post("/:id", RoomController.updateStatus);
roomRouter.get("/", RoomController.getAll);