// authMiddleware.js (FINAL FIX: Uses Clerk API for Profile Data)

import User from '../models/user.js';
// IMPORTANT: This import path must correctly point to your initialized Clerk SDK utility.
// If you are using 'clerk-sdk-node', this structure is common:
import { users } from '@clerk/clerk-sdk-node';

export const protect = async (req, res, next) => {
    try {
        const authData = req.auth();
        const { userId } = authData;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        // --- STEP 1: FETCH FULL USER OBJECT VIA CLERK API ---
        // This is the CRITICAL step that replaces relying on the limited token claims.
        const clerkUser = await users.getUser(userId);

        // --- STEP 2: EXTRACT REAL DATA FROM THE CLERK API RESPONSE ---

        // 1. Email: Find the primary email object and get its address.
        const primaryEmail = clerkUser.emailAddresses.find(
            (emailObj) => emailObj.id === clerkUser.primaryEmailAddressId
        )?.emailAddress;

        const userEmail = primaryEmail || `user-${userId}@temp.clerk`; // Use ID as last resort fallback

        // 2. Username: Use the username or fall back to first/last name, then the ID.
        const userUsername = clerkUser.username || clerkUser.firstName || userId;

        // 3. Image: Get the profile image URL.
        const userImage = clerkUser.imageUrl || "default-image-url";

        // --- STEP 3: Mongoose Sync/Upsert with REAL DATA ---
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $setOnInsert: {
                    email: userEmail,         // Saved (REAL EMAIL)
                    username: userUsername,   // Saved (REAL USERNAME)
                    image: userImage,         // Saved (REAL IMAGE URL)
                    role: "user",
                    recentSearchedCities: [],
                }
            },
            { new: true, upsert: true, runValidators: true }
        );

        req.user = user;
        req.auth = authData;

        next();

    } catch (error) {
        console.error("Auth Middleware full error:", error); // <-- Add this line
        // ... then your existing log:
        console.log("Auth Middleware Error (Clerk API/Mongoose):");
        // ... return error response ...
    }
};

export default protect;