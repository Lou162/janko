import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  collection,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import type { Room } from "../models/roomModel";

console.log("VITE_API_KEY=", import.meta.env.VITE_API_KEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Debug: afficher la config chargée (temporaire, utile en dev uniquement)
console.log("[debug] Firebase config:", {
  apiKey: firebaseConfig.apiKey ? "(set)" : "(missing)",
  authDomain: firebaseConfig.authDomain ? "(set)" : "(missing)",
  projectId: firebaseConfig.projectId ? "(set)" : "(missing)",
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const roomsRef = collection(db, "rooms");

async function addRoom(data: Room, name: string) {
  await setDoc(doc(roomsRef, name), data);
}

async function addPlayerInRoom(
  roomId: string,
  playerId: string,
  uid: string | undefined,
) {
  const playerRef = doc(db, "rooms", roomId);
  await updateDoc(playerRef, {
    guestId: uid,
    [`players.${uid}`]: {
      id: playerId,
      name: "Guest",
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
export async function setPlayerChoice(
  roomId: string,
  uid: string | undefined,
  choice: string | null,
) {
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
 * Récupère le nombre de joueurs actuels et le maximum pour une room.
 * Retourne { currentPlayers: number | null, maxPlayers: number | null }
 */
export async function getRoomPlayerCounts(roomId: string) {
  try {
    const roomRef = doc(db, "rooms", roomId);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      const data = roomSnap.data() as Room;
      return {
        currentPlayers: Object.keys(data.players || {}).length,
        maxPlayers: data.maxPlayers ?? 0,
      };
    }
    return { currentPlayers: 0, maxPlayers: 0 };
  } catch (error) {
    console.error("Erreur lors de la récupération des données de room:", error);
    return { currentPlayers: 0, maxPlayers: 0 };
  }
}

/**
 * Écoute en temps réel le nombre de joueurs d'une room.
 * Retourne une fonction pour se désabonner.
 */
export function listenToRoomPlayerCounts(
  roomId: string,
  callback: (counts: { currentPlayers: number; maxPlayers: number }) => void,
) {
  const roomRef = doc(db, "rooms", roomId);

  return onSnapshot(
    roomRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as Room;
        callback({
          currentPlayers: data.currentPlayers ?? 0,
          maxPlayers: data.maxPlayers ?? 0,
        });
      }
    },
    (error) => {
      console.error("Erreur lors de l'écoute de la room:", error);
    },
  );
}

/**
 * Écoute en temps réel la room Firestore.
 * cb reçoit la donnée Room (ou null si non existante).
 * Retourne la fonction d'unsubscribe.
 */

export { db, addRoom, addPlayerInRoom, firebaseConfig };
