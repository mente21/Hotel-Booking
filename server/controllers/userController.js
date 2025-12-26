// userController.js
import User from "../models/user.js";

// GET /api/user/
export const getUserData = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ success: false, message: "User data not found after authentication." });
        }

        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;

        // FIX CHECK: Ensures 'isOwner' is TRUE only if the database role is exactly 'hotelOwner'
        // This MUST match the role saved in hotelController.js (now corrected to lowercase 'hotelOwner').
        const isOwner = role === 'hotelOwner';

        // Return the definitive owner status
        res.json({ success: true, role, recentSearchedCities, isOwner });
    } catch (error) {
        console.error("getUserData Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// Store User Recent Searched Cities (Remaining unchanged)
export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { recentSearchedCity } = req.body;
        const clerkUserId = req.auth.userId || req.user.id;
        const user = await User.findById(clerkUserId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found in DB." });
        }

        // Array logic
        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCity)
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity)
        }

        await user.save();
        res.json({ success: true, message: "City added" })

    } catch (error) {
        console.error("Store Recent Search Error:", error);
        res.status(500).json({ success: false, message: error.message })
    }
};