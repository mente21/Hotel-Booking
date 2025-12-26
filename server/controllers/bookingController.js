// controllers/bookingController.js
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import transporter from "../configs/nodemailer.js";
import stripe from 'stripe'



// Check Availability Helper
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        });

        return bookings.length === 0;
    } catch (error) {
        console.error("Availability Error:", error.message);
        return false;
    }
};

// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        const isAvailable = await checkAvailability({
            checkInDate: checkIn,
            checkOutDate: checkOut,
            room
        });

        res.json({ success: true, isAvailable });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// POST /api/bookings/book
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        const isAvailable = await checkAvailability({
            checkInDate: checkIn,
            checkOutDate: checkOut,
            room,
        });

        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not available" });
        }

        // Room Details
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // Nights Calculation
        const timeDiff = checkOut - checkIn;
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        totalPrice *= nights;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: Number(guests),
            checkInDate: checkIn,
            checkOutDate: checkOut,
            totalPrice,
        });

        // inside createBooking after booking is created:

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "Your Hotel Booking Confirmation",
            html: `
        <h2>Booking Confirmed ✔</h2>
        <p>Hello ${req.user.username},</p>

        <p>Your booking has been successfully created. Here are your details:</p>

        <ul>
            <li><strong>Booking ID:</strong> ${booking.id}</li>
            <li><strong>Hotel:</strong> ${roomData.hotel.name}</li>
            <li><strong>Address:</strong> ${roomData.hotel.address}</li>
            <li><strong>Check-in:</strong> ${booking.checkInDate.toDateString()}</li>
            <li><strong>Check-out:</strong> ${booking.checkOutDate.toDateString()}</li>
            <li><strong>Total Price:</strong> ${process.env.CURRENCY || "$"} ${booking.totalPrice}</li>
        </ul>

        <p>Thank you for booking with us.</p>
    `
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Booking created successfully" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to create booking" });
    }
};

// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;

        const bookings = await Booking.find({ user })
            .populate("room hotel")
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });

    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings" });
    }
};

// GET /api/bookings/hotel
export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotel) {
            return res.json({ success: false, message: "No Hotel found" });
        }

        const bookings = await Booking.find({ hotel: hotel._id })
            .populate("room hotel user")
            .sort({ createdAt: -1 });

        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

        res.json({
            success: true,
            dashboardData: { totalBookings, totalRevenue, bookings }
        });

    } catch (error) {
        res.json({ success: false, message: "Failed to fetch hotel bookings" });
    }
};
export const stripePayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        const roomData = await Room.findById(booking.room).populate('hotel');
        const totalPrice = booking.totalPrice;
        const { origin } = req.headers;

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: roomData.hotel.name,
                    },
                    unit_amount: totalPrice * 100 // Converting dollars/units to cents
                },
                quantity: 1,
            }
        ]
        // Create Checkout Session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            // --- CRITICAL FIX: Ensure the correct flag is present in the success URL ---
            success_url: `${origin}/my-bookings?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/my-bookings`,
            metadata: {
                bookingId,
            },
        });

        res.json({ success: true, url: session.url }); // Line 167

    } catch (error) {
        res.json({ success: false, message: "Payment Failed" });
    }


};

// API to verify payment status
export const verifyPayment = async (req, res) => {
    try {
        const { bookingId, success, session_id } = req.body;
        const userId = req.user._id;

        if (success === "true" && session_id) {
            const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
            const session = await stripeInstance.checkout.sessions.retrieve(session_id);

            if (session.payment_status === "paid") {
                const bookingIdFromSession = session.metadata.bookingId;
                await Booking.findByIdAndUpdate(bookingIdFromSession, { isPaid: true, paymentMethod: "stripe", status: "confirmed" });
                res.json({ success: true, message: "Payment Successful" });
            } else {
                res.json({ success: false, message: "Payment Failed" });
            }
        } else {
            res.json({ success: false, message: "Payment Failed" });
        }

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}