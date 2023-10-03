import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../util/firebase";
import checkIfCollectionExists from "../../util/checkIfDocumentExists";

export const LoadingScreen = () => {
  const [inventorySettings, setInventorySettings] = useState({});
  // Usage example in Next.js useEffect
  useEffect(() => {
    const batchSize = 50; // Specify the desired batch size

    // uploadInventoryDocuments(batchSize);
  }, []);

  const fetchInventorySettings = async () => {
    const inventorySettingsDocRef = doc(db, "inventorySettings", "settings");

    try {
      // Check if the document exists
      const inventorySettingsDocSnapshot = await getDoc(
        inventorySettingsDocRef
      );

      if (inventorySettingsDocSnapshot.exists()) {
        const data = inventorySettingsDocSnapshot.data();
        setInventorySettings(data);
      } else {
        // Create the document with default properties
        const defaultProperties = {
          property1: "default value 1",
          property2: "default value 2",
          // Add more properties as needed
        };

        await setDoc(inventorySettingsDocRef, defaultProperties);
        setInventorySettings(defaultProperties);
      }
    } catch (error) {
      console.error("Error retrieving inventory settings:", error);
    }
  };

  const uploadInventoryDocuments = async (batchSize: number) => {
    try {
      // Read all documents from the "inventory" collection
      const inventoryRef = collection(db, "inventory");
      const inventorySnapshot = await getDocs(inventoryRef);

      // Create a new collection for the uploaded documents
      const uploadedCollectionRef = collection(db, "uploaded");

      // Iterate over the inventory documents in batches
      const inventoryDocuments = inventorySnapshot.docs;
      const totalDocuments = inventoryDocuments.length;
      let batchCount = 0;

      for (let i = 0; i < totalDocuments; i += batchSize) {
        const batch = inventoryDocuments.slice(i, i + batchSize);
        const batchUploadPromises = batch.map(async (doc) => {
          // Retrieve required fields from the inventory document
          const { id, created } = doc.data();

          // Create a new document in the "uploaded" collection with required fields
          const newDocRef = await addDoc(uploadedCollectionRef, {
            id,
            created: Timestamp.fromMillis(created.toMillis()),
          });

          return newDocRef.id;
        });

        // Wait for all documents in the current batch to be uploaded
        const batchResults = await Promise.all(batchUploadPromises);
        batchCount++;

        console.log(
          `Batch ${batchCount} uploaded: ${batchResults.length} documents`
        );
      }

      console.log("All inventory documents uploaded successfully");
    } catch (error) {
      console.error("Error uploading inventory documents:", error);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-primary-yellow flex justify-center items-center z-50">
      <p className="text-2xl">Loading</p>
    </div>
  );
};

export default LoadingScreen;
