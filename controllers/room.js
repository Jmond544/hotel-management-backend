import { RoomModel } from "../models/mysql/room.js";

import { validateRoomState } from "../schemas/room.js";

export class RoomController {
  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const room = await RoomModel.getOne({ id });
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const rooms = await RoomModel.getAll();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { estado } = validateRoomState(req.body);
      await RoomModel.updateStatus({ status: estado, id });
      res.status(200).json({ message: "Room status updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
