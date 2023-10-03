import { Dashoboard_Header as Header } from "../../../../components/UI/dashboard_header";
import Sidebar from "../../../../components/Navigation and Controls/Sidebar";
import { InventoryControls as Controls } from "../../../../components/UI/Controls/InventoryControls";
import ListHeader from "../../../../components/UI/ListHeader";
import fetchDocuments from "../../../../util/fetchDocuments";
import PaginatedListView from "../../../../components/UI/Lists/paginatedListView";
import React, { Fragment, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { Button_Primary as BTN } from "../../../../components/Inputs/button";
import { Refresh } from "@mui/icons-material";
import { LoadingScreen as LoadScreen } from "../../../../components/special_components/LoadingScreen";
import { QuickAddItem as QAdd } from "../../../../components/Forms/AddItem";
import ItemData from "../../../../Interfaces/itemData";
import addDocument from "../../../../util/addDocument";
import {
  Prompt as ItemAddedPrompt,
  Prompt as ItemDeletedPrompt,
} from "../../../../components/UI/Prompts/Prompts";
import { CheckCircle as Check } from "@mui/icons-material";
import { CollectionReference } from "firebase/firestore";
import { EditItem as QEdit } from "../../../../components/Forms/Edit Item";
import updateDocument from "../../../../util/updateDocument";
import DeleteItems from "../../../../components/Forms/DeleteItems";
import deleteDocument, {
  deleteDocuments,
} from "../../../../util/deleteDocument";

const Dashboard_Inventory_Page = () => {
  const [viewType, setViewType] = useState(1);
  const [docs, setDocs] = useState<ItemData[]>([]);
  const [quickAddIsActive, setQuickAddIsActive] = useState(false);
  const [EditIsActive, setEditIsActive] = useState(false);
  const [documentAddedPromptIsActive, setDocumentAddedPromptIsActive] =
    useState(false);
  const [
    documentUpdatedSuccessfullyPromptIsActive,
    setDocumentUpdatedSuccessfullyPromptIsActive,
  ] = useState(false);
  const [selectedItemsList, setSelectedItemsList] = useState<string[]>([]);
  const [deleteItemPromptIsActive, setDeleteItemPromptIsActive] =
    useState<boolean>(false);
  const [deleteItemMenuIsActive, setDeleteItemMenuIsActive] =
    useState<boolean>();
  const [currentExpandedCard, setCurrentExpandedCard] = useState<string>("");
  const [numberOfItemsDeleted, setNumberofItemsDeleted] = useState<number>(0);

  const loadAllItems = async () => {
    console.log("reloading items");
    const collectionPath = [
      "Users",
      "Mo9oW07e6VdhD4a7TzeTaRqak2V2",
      "Inventory",
    ];
    const limitCount = 500;

    const documents: DocumentData[] | null = await fetchDocuments(
      collectionPath,
      limitCount
    );

    return documents as ItemData[];
  };

  const addItem = async (data: ItemData) => {
    console.log("Item added:", data);
    const documentPath = [
      "Users",
      "Mo9oW07e6VdhD4a7TzeTaRqak2V2",
      "Inventory",
      data.id,
    ];

    console.log("item added:", data);

    const newDocs = [...docs, data]; //add items to the existing array.
    setDocs(newDocs);
    toggleAddItemMenu(); //toggle the quick add menu
    await addDocument(
      documentPath as unknown as CollectionReference<DocumentData>[],
      data
    );
    toggleDocumentAddedSuccessfullyPrompt();

    setTimeout(() => {
      setDocumentAddedPromptIsActive(false);
    }, 1000);
  };

  const updateInventoryItem = async (data: ItemData) => {
    const documentPath = [
      "Users",
      "Mo9oW07e6VdhD4a7TzeTaRqak2V2",
      "Inventory",
      data.id,
    ];

    console.log("updated:", data);

    const newDocs = [...docs].map((doc) => {
      if (doc.id === data.id) {
        return data;
      }
      return doc;
    }); //add items to the existing array.
    setDocs(newDocs as ItemData[]);
    toggleEditItemMenu(); //toggle the quick add menu
    await updateDocument(
      documentPath as unknown as CollectionReference<DocumentData>[],
      data
    );
    toggleDocumentUpdatedSuccessfullyPrompt();

    setTimeout(() => {
      setDocumentUpdatedSuccessfullyPromptIsActive(false);
    }, 1000);
  };

  const deleteItems = async (event:React.SyntheticEvent) => {
    event.preventDefault();
    const documentPath = [
      "Users ",
      "Mo9oW07e6VdhD4a7TzeTaRqak2V2",
      " Inventory ",
    ];

    await deleteDocuments(selectedItemsList, documentPath);

    const filteredItems = docs.filter(
      (item) => !selectedItemsList.includes(item.id)
    );

    setNumberofItemsDeleted(selectedItemsList.length);
    setSelectedItemsList([]); // Clear the array of selected IDs

    setDocs(filteredItems as ItemData[]);

    toggleDeleteItemMenu(); //toggle the delete item menu

    setDeleteItemPromptIsActive(true);

    setTimeout(() => {
      setDeleteItemPromptIsActive(false);
    }, 1000);
  };

  useEffect(() => {
    loadAllItems().then((documents) => {
      setDocs(documents);
      console.log("all docs size:", documents.length | 0, documents);
    });
  }, []);

  const toggleAddItemMenu = () => {
    //activates or deactivates quick add menu
    setQuickAddIsActive(!quickAddIsActive);
  };

  const toggleEditItemMenu = () => {
    //activates or deactivates quick add menu
    setEditIsActive(!EditIsActive);
  };

  const toggleDocumentAddedSuccessfullyPrompt = () => {
    setDocumentAddedPromptIsActive(!documentAddedPromptIsActive);
  };

  const toggleDocumentUpdatedSuccessfullyPrompt = () => {
    setDocumentUpdatedSuccessfullyPromptIsActive(
      !documentUpdatedSuccessfullyPromptIsActive
    );
  };

  const determineCurrentExpansion = (cardID: string) => {
    const currentID = cardID;
    setCurrentExpandedCard(currentID);
  };

  const addOrRemoveSelection = (
    selectedItem: string,
    selectStatus: boolean
  ) => {
    if (!selectStatus) {
      const remainingItems = selectedItemsList.filter(
        (item) => selectedItem !== item
      );
      setSelectedItemsList(remainingItems);
      console.log("remaining items:", remainingItems);
    } else if (selectStatus) {
      const selected = [...selectedItemsList, selectedItem];
      console.log("remaining items:", selected);
      setSelectedItemsList(selected);
    }
  };

  const toggleDeleteItemMenu = () => {
    setDeleteItemMenuIsActive(!deleteItemMenuIsActive);
  };

  return (
    <Fragment>
      {/* <LoadScreen/> */}
      {quickAddIsActive && (
        <QAdd toggleAddItemMenu={toggleAddItemMenu} addItem={addItem} />
      )}

      {EditIsActive && selectedItemsList.length === 0 && (
        <QEdit
          toggleEditItemMenu={toggleEditItemMenu}
          updateInventoryItem={updateInventoryItem}
          data={docs}
          currentCard={currentExpandedCard}
        />
      )}
      {EditIsActive && selectedItemsList.length === 1 && (
        <QEdit
          toggleEditItemMenu={toggleEditItemMenu}
          updateInventoryItem={updateInventoryItem}
          data={docs}
          currentCard={selectedItemsList[0]}
        />
      )}

      {deleteItemMenuIsActive && (
        <DeleteItems
          deleteItems={deleteItems}
          toggleDeleteItem={toggleDeleteItemMenu}
          selectedItems={selectedItemsList}
          docs={docs}
          addOrRemoveSelection={addOrRemoveSelection}
        />
      )}

      {documentAddedPromptIsActive && (
        <ItemAddedPrompt className="animate-fade-in-down px-3 z-50 fixed top-1/2 left-[38%] transform -translate-x-1/2 -translate-y-1/2">
          <span className="flex justify-between items-center w-full h-full">
            Item Added Successfully
          </span>
          <span className=" h-full  flex items-center text-green-600">
            <Check />
          </span>
        </ItemAddedPrompt>
      )}

      {deleteItemPromptIsActive && (
        <ItemDeletedPrompt className="animate-fade-in-down px-3 z-50 fixed top-1/2 left-[38%] transform -translate-x-1/2 -translate-y-1/2">
          <span className="flex justify-between items-center w-full h-full">
            {numberOfItemsDeleted > 1 ? numberOfItemsDeleted : "1"} Item
            {numberOfItemsDeleted > 1 ? "s" : ""} Deleted Successfully
          </span>
          <span className=" h-full  flex items-center text-green-600">
            <Check />
          </span>
        </ItemDeletedPrompt>
      )}

      {documentAddedPromptIsActive && (
        <ItemAddedPrompt className="animate-fade-in-down px-3 z-50 fixed top-1/2 left-[38%] transform -translate-x-1/2 -translate-y-1/2">
          <span className="flex justify-between items-center w-full h-full">
            Item Added Successfully
          </span>
          <span className=" h-full  flex items-center text-green-600">
            <Check />
          </span>
        </ItemAddedPrompt>
      )}

      <div className="min-h-screen flex w-[88%]">
        <div className="w-full h-full flex flex-col bg-white">
          <Header
            storeTitle="Ghanaian Way Restaurant & Grocery Store"
            pageTitle="Inventory"
          />

          <div className="fixed top-16 w-[88%] bg-white z-10 h-auto flex justify-center items-center flex-col  mx-auto">
            <Controls
              addItem={toggleAddItemMenu}
              editItem={toggleEditItemMenu}
              selectedItems={selectedItemsList}
              toggleDeleteItemMenu={toggleDeleteItemMenu}
            />
            <ListHeader />

            {!docs ||
              (docs.length === 0 && (
                <div className="w-10/12 h-full z-0 flex items-center mt-10 mx-auto justify-center">
                  <BTN
                    onClick={(e) => {
                      loadAllItems().then((documents) => {
                        setDocs(documents);
                      });
                    }}
                    className="py-3 h-10 px-3 flex justify-between items-center"
                  >
                    Reload Items
                    <span>
                      <Refresh />
                    </span>
                  </BTN>
                </div>
              ))}
          </div>
          {viewType === 1 && (
            <PaginatedListView
              toggleEdit={toggleEditItemMenu}
              documents={docs}
              determineCurrentExpansion={determineCurrentExpansion}
              currentExpandedCard={currentExpandedCard}
              addOrRemoveSelection={addOrRemoveSelection}
              selectedItems={selectedItemsList}
            />
          )}
        </div>
        <div className="w-[12%] h-full fixed top-0 right-0 bg-primary-black">
          <Sidebar />
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard_Inventory_Page;

// 3

// export async function
