import { Router } from "express";

import { RoomController } from "../controllers/room.js";

export const roomRouter = Router();

roomRouter.post("/:roomNumber", RoomController.updateStatus);
roomRouter.get("/", RoomController.getByQuery);