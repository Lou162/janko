import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
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

async function addPlayerInRoom(roomId: string, playerId: string, uid: string | undefined) {
  const playerRef = doc(db, "rooms", roomId);
  await updateDoc(playerRef, {
    guestId: uid,
    [`players.${uid}`]: {
      id: playerId,
      name: "guest",
      choice: null,
      ready: false,
      score: 0,
    },
  });
} 

/**
 * Met à jour le choix d'un joueur dans la room.
 * uid correspond à la clé du joueur dans room.players (vous stockiez les players par uid).
 */
export async function setPlayerChoice(roomId: string, uid: string | undefined, choice: string | null) {
  if (!uid) return;
  const roomRef = doc(db, "rooms", roomId);
  await updateDoc(roomRef, {
    [`players.${uid}.choice`]: choice,
    [`players.${uid}.ready`]: true,
  });
}

/**
 * Réinitialise le choice d'un joueur (utile pour next round).
 */
export async function clearChoiceFor(roomId: string, uid: string | undefined) {
  if (!uid) return;
  const roomRef = doc(db, "rooms", roomId);
  await updateDoc(roomRef, { [`players.${uid}.ready`]: false });
}

/**
 * Écoute en temps réel la room Firestore.
 * cb reçoit la donnée Room (ou null si non existante).
 * Retourne la fonction d'unsubscribe.
 */


export { db, addRoom, addPlayerInRoom, firebaseConfig };
