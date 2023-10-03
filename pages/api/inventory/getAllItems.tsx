// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../../util/firebase";

// import { NextApiRequest, NextApiResponse } from "next";
// // pages/api/getData.js

// export default async function getData(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Fetch data from Firebase Firestore
//     const querySnapshot = await getDocs(
//       collection(db, "Users", "Mo9oW07e6VdhD4a7TzeTaRqak2V2", "Inventory")
//     );
//     let docs: any[] = [];
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//       docs.push(doc.data());
//     });

//     res.status(200).json(JSON.stringify(docs));
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// }
// // 