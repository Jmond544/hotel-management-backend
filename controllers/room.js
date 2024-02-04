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

  static async getByQuery(req, res) {
    try {
      const { type, number, status } = req.query;
      if (type) {
        const room = await RoomModel.getByTypeRoom({ type });
        res.status(200).json(room);
      } else if (number) {
        const room = await RoomModel.getByNumberRoom({ number });
        res.status(200).json(room[0]);
      } else if (status) {
        const room = await RoomModel.getByStatusRoom({ status });
        res.status(200).json(room);
      } else {
        const rooms = await RoomModel.getAll();
        res.status(200).json(rooms);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { roomNumber } = req.params;
      const { estado } = validateRoomState(req.body);
      await RoomModel.updateStatus({ status: estado, roomNumber });
      res.status(200).json({ message: "Room status updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
