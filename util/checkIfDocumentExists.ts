import { collection, getFirestore, getDocs } from "firebase/firestore";

export const checkIfCollectionExists = async (collectionPath: string): Promise<boolean> => {
  const db = getFirestore();

  try {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking collection existence:", error);
    return false;
  }
};

export default checkIfCollectionExists
