import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  updateDoc,
} from "firebase/firestore/lite";
import type { Room } from "../models/roomModel";

// TODO: Replace the following with your app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const roomsRef = collection(db, "rooms");

async function addRoom(data: Room, name: string) {
  await setDoc(doc(roomsRef, name), data);
}

async function addPlayerInRoom(roomId: string, playerId: string) {
  const playerRef = doc(db, "rooms", roomId);
  await updateDoc(playerRef, {
    [`players.${playerId}`]: {
      id: playerId,
      name: "Naruto",
      choice: null,
      ready: true,
      score: 0,
    },
  });
}
export { db, addRoom, addPlayerInRoom };
