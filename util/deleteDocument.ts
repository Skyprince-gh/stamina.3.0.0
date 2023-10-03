import { db } from "./firebase";
// import {deleteDoc, doc} from "firebase/firestore"

// Assume you have initialized your Firebase app and Firestore

export const deleteDocuments = async (itemIds: string[], path: string[]) => {
  // itemIds.forEach((id) => {
  //   console.log(id);
  //   deleteDoc(
  //     doc(db, "Users ", "Mo9oW07e6VdhD4a7TzeTaRqak2V2", " Inventory ", id)
  //   );
  // });
};

// // Example usage
// const itemIdsToDelete = ['itemId1', 'itemId2', 'itemId3'];
// deleteItems(itemIdsToDelete);

export default deleteDocuments;
