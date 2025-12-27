import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js"

// API to create a new room for a hotel
export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;
        const hotel = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotel) return res.json({ success: false, message: "No Hotel found" });

        // upload images to cloudinary
        let images = [];
        if (req.files && req.files.length > 0) {
            const uploadImages = req.files.map(async (file) => {
                const response = await cloudinary.uploader.upload(file.path);
                return response.secure_url;
            })
            images = await Promise.all(uploadImages)
        } else if (req.body.imageUrls) {
            // Allow seeding with direct URLs
            images = JSON.parse(req.body.imageUrls);
        }

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        })

        res.json({ success: true, message: "Room created successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
// API to get all rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true }).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'image'
            }
        })
            .sort({ createdAt: -1 });
        res.json({ success: true, rooms });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to get all rooms for a specific hotel
export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await Hotel.findOne({ owner: req.auth.userId })
        const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
            "hotel"
        )
        res.json({ success: true, rooms });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({ success: true, message: "Room availability Updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to delete a room
export const deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.body;
        const hotel = await Hotel.findOne({ owner: req.auth.userId });
        const room = await Room.findById(roomId);

        if (!room || room.hotel.toString() !== hotel._id.toString()) {
            return res.json({ success: false, message: "Unauthorized or Room not found" });
        }

        await Room.findByIdAndDelete(roomId);
        res.json({ success: true, message: "Room deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to update room details
export const updateRoom = async (req, res) => {
    try {
        const { roomId, roomType, pricePerNight, amenities } = req.body;
        const hotel = await Hotel.findOne({ owner: req.auth.userId });
        const room = await Room.findById(roomId);

        if (!room || room.hotel.toString() !== hotel._id.toString()) {
            return res.json({ success: false, message: "Unauthorized or Room not found" });
        }

        const updateData = {
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities)
        };

        // If new images are uploaded
        if (req.files && req.files.length > 0) {
            const uploadImages = req.files.map(async (file) => {
                const response = await cloudinary.uploader.upload(file.path);
                return response.secure_url;
            });
            updateData.images = await Promise.all(uploadImages);
        }

        await Room.findByIdAndUpdate(roomId, updateData);
        res.json({ success: true, message: "Room updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}