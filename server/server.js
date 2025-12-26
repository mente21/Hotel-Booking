// server.js

import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js"
import { clerkMiddleware } from "@clerk/express"
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoutes.js"
import hotelRouter from "./routes/hotelRoutes.js"
import connectCloudinary from "./configs/cloudinary.js"
import roomRouter from "./routes/roomRoute.js"
import bookingRouter from "./routes/bookingRoutes.js"
import { stripeWebhooks } from "./controllers/stripeWebhooks.js"

connectDB()
connectCloudinary()

const app = express()

// Allow CORS for the frontend URL (will be set in Vercel environment variables)
app.use(cors({
    origin: process.env.CLIENT_URL || "*"
}))

// 1. WEBHOOK HANDLERS: Must come BEFORE express.json() to get the raw body.

// Stripe Webhook (Raw Body)
app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), stripeWebhooks)

// Clerk Webhook (Raw Body)
app.post("/api/clerk", express.raw({ type: "application/json" }), clerkWebhooks)


// 2. GLOBAL MIDDLEWARE: For standard JSON requests.
app.use(express.json())
app.use(clerkMiddleware())

// 3. API Routes
app.get("/", (req, res) => res.send("API IS WORKING"))
app.use("/api/user", userRouter)
app.use("/api/hotels", hotelRouter)
app.use("/api/rooms", roomRouter)
app.use("/api/bookings", bookingRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
