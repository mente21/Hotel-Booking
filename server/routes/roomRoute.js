import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import { createRoom, deleteRoom, getOwnerRooms, getRooms, toggleRoomAvailability, updateRoom } from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post('/', upload.array("images", 4), protect, createRoom)
roomRouter.post('/update', upload.array("images", 4), protect, updateRoom)
roomRouter.get('/', getRooms)
roomRouter.get('/owner', protect, getOwnerRooms)
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability)
roomRouter.post('/delete', protect, deleteRoom)

export default roomRouter;