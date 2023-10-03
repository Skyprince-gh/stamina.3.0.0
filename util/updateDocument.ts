import { db } from "./firebase";
import { updateDoc, doc, CollectionReference } from "firebase/firestore";

export const updateDocument = async (path: CollectionReference[], data: any) => {
  await updateDoc(doc(db, ...path), data);
};

export default updateDocument;
