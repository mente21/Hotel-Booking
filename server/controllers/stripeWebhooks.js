// controllers/stripeWebhooks.js

import stripe from "stripe";
import Booking from "../models/Booking.js"; // FIX: Corrected import path to .js extension

// API to handle Stripe Webhooks
export const stripeWebhooks = async (request, response) => {
    // Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        // FIX: MUST return here to stop the function if verification fails (HTTP 400 response)
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // CRITICAL FIX: The event type to get Session metadata is usually 'checkout.session.completed'.
    // While 'payment_intent.succeeded' works, using 'checkout.session.completed' is simpler 
    // and more reliable for fetching the session object and its metadata.
    if (event.type === "checkout.session.completed") {

        // When using 'checkout.session.completed', the session object is the event data object itself.
        const session = event.data.object;

        const bookingId = session.metadata?.bookingId; // Optional chaining for safety

        if (!bookingId) {
            console.error("Webhook Error: No bookingId found in metadata for session ID:", session.id);
            // Must return 200/received:true so Stripe doesn't retry a bad request
            return response.json({ received: true });
        }

        // Mark Payment as Paid
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { isPaid: true, paymentMethod: "stripe", status: "confirmed" },
            { new: true } // {new: true} is good practice to get the updated document
        );

        if (updatedBooking) {
            console.log(`Booking ${bookingId} marked as paid.`);
        } else {
            console.error(`ERROR: Could not find or update booking ID ${bookingId}`);
        }

    }

    // If the event type is anything else, log it.
    else {
        console.log("Unhandled event type : ", event.type);
    }

    // Send a 200 OK response to Stripe to acknowledge receipt.
    return response.json({ received: true });
};