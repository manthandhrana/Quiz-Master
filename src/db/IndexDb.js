import { openDB } from "idb";

const DB_NAME = "QuizDB";
const STORE_NAME = "quizAttempts";

// Initialize IndexedDB
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
};

// Save attempt to IndexedDB
export const saveAttemptToDB = async (score) => {
  const db = await initDB();
  await db.add(STORE_NAME, { score, timestamp: new Date().toISOString() });
};

// Get all attempts from IndexedDB
export const getAttemptsFromDB = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};
