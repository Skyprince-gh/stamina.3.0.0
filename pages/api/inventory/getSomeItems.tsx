import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../util/firebase";

// pages/api/getData.js

export default async function getData(req:any, res:any) {
  try {
    // Fetch data from Firebase Firestore
    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      res.status(200).json(doc.data());
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
