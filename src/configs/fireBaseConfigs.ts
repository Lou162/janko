import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, collection } from "firebase/firestore/lite";
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
  // databaseURL:
  //   "https://janko-cd115-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const roomsRef = collection(db, "rooms");

// Get a list of cities from your database
// async function getCities(db) {
//   const roomsCol = db.collection("Rooms").whereEqualTo("id", "ROOM-ABC123");
//   const roomSnapshot = await getDocs(roomsCol);
//   const roomList = roomSnapshot.forEach((doc) => {
//     console.log(doc.id, "=>", doc.data());
//     return doc.data();
//   });
//   return roomList;
// }

async function addRoom(data: Room, name: string) {
  console.log(import.meta.env.VITE_API_KEY);
  console.log("Adding room to Firestore:", data);
  await setDoc(doc(roomsRef, name), data);
}
export { db, addRoom };
