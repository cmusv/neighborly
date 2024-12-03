import { openDB, deleteDB } from "idb";

// Database constants
const DB_NAME = "PetTinderDB";
const PROFILE_STORE = "Profiles";
const PHOTO_STORE = "Photos";
const MUTUAL_MATCHES_STORE = "MutualMatches";

// Profile structure
export class Profile {
    constructor(userID, accountName, userName, userPhotoID, likedList = [], pendingList = []) {
        this.userID = userID; // Unique identifier for the user
        this.accountName = accountName; // Account name for the user
        this.userName = userName; // Display Pet Tinder Profile name, editable
        this.userPhotoID = userPhotoID; // ID referencing a photo in PHOTO_STORE
        this.likedList = likedList; // List of userIDs the user has liked
        this.pendingList = pendingList; // List of userIDs awaiting a decision
    }
}

// Initialize database
export async function initDB() {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(PROFILE_STORE)) {
                db.createObjectStore(PROFILE_STORE, { keyPath: "userID" });
            }
            if (!db.objectStoreNames.contains(PHOTO_STORE)) {
                db.createObjectStore(PHOTO_STORE, { keyPath: "userID" });
            }
            if (!db.objectStoreNames.contains(MUTUAL_MATCHES_STORE)) {
                db.createObjectStore(MUTUAL_MATCHES_STORE, { keyPath: "matchID" });
            }
        },
    });
    return db;
}

// Create a new profile
export function createProfile(userID, accountName, userName, userPhotoID = "", likedList = [], pendingList = []) {
    return new Profile(userID, accountName, userName, userPhotoID, likedList, pendingList);
}

// Save a profile
export async function saveProfile(profile) {
    const db = await initDB();
    console.log(profile);
    if (!(profile instanceof Profile)) {
        throw new Error("Profile data does not match the required structure.");
    }

    await db.put(PROFILE_STORE, profile);
}

// Get all profiles
export async function getProfiles() {
    const db = await initDB();
    const profiles = await db.getAll(PROFILE_STORE);

    return profiles.map((data) =>
        new Profile(
            data.userID,
            data.accountName,
            data.userName,
            data.userPhotoID,
            data.likedList || [],
            data.pendingList || []
        )
    );
}

// Photo operations
export async function savePhoto(userID, photo) {
    const db = await initDB();
    await db.put(PHOTO_STORE, { userID, photo });
}

export async function getPhoto(userID) {
    const db = await initDB();
    const photoRecord = await db.get(PHOTO_STORE, userID);
    return photoRecord?.photo || "";
}

// Save a mutual match
export async function saveMutualMatch(match) {
    const db = await initDB();
    await db.put(MUTUAL_MATCHES_STORE, match);
}

// Get all mutual matches
export async function getMutualMatches() {
    const db = await initDB();
    return await db.getAll(MUTUAL_MATCHES_STORE);
}

// Utility function to update specific fields of a profile in the DB
export async function updateProfileField(userID, field, value) {
    const db = await initDB();
    const profile = await db.get(PROFILE_STORE, userID);

    if (!profile) {
        throw new Error(`Profile with userID ${userID} not found.`);
    }

    // Update the specific field with the new value
    profile[field] = value;

    await db.put(PROFILE_STORE, profile); // Save the updated profile
}

// Clear database
export async function clearDatabase() {
    try {
        await deleteDB(DB_NAME);
        console.log("IndexedDB cleared successfully.");
    } catch (error) {
        console.error("Error clearing IndexedDB:", error);
    }
}