import { db } from "./firebase";
import { setDoc, doc, CollectionReference } from "firebase/firestore";

export const addDocument = async (path: CollectionReference[], data: any) => {
  await setDoc(doc(db, ...path), data);
};

export default addDocument;
