import { collection, query, getDocs, limit } from "firebase/firestore";
import { db } from "./firebase";

const fetchDocuments = async (collectionPath: any[], limitCount: number) => {
  try {
    const collectionRef = collection(db, ...collectionPath);
    const querySnapshot = await getDocs(
      query(collectionRef, limit(limitCount))
    );

    const documents = querySnapshot.docs.map((doc) => doc.data());
    return documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
};

export default fetchDocuments;
