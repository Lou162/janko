import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
import type { Room } from "../models/roomModel";

// TODO: Replace the following with your app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2qCEw3KxKOaPfG-8Kg38MJwUUUQV_GIY",
  authDomain: "janko-50553.firebaseapp.com",
  projectId: "janko-50553",
  storageBucket: "janko-50553.firebasestorage.app",
  messagingSenderId: "858392337646",
  appId: "1:858392337646:web:daed37426dadeb3b2427ff",
  measurementId: "G-QEHCH5DCWK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
  await setDoc(doc(db, "Rooms", name), data);
}
export { db, addRoom };
