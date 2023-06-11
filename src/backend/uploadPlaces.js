import { db } from "./firebase/firebase.js";
import { updateDoc, addDoc, collection } from "firebase/firestore";
import data from '../lib/data/places.json' assert { type: 'json' };

for (let i=0; i < data.length; i++) {
    const docRef = await addDoc(collection(db, "places"), data[i]);
    await updateDoc(docRef, {
        id: docRef.id
    });
}
