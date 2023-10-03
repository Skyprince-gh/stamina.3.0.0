import { Close, Delete, Remove } from "@mui/icons-material";
import ItemData from "../../Interfaces/itemData";
import { useEffect, useState } from "react";
import { Button_Disabled, Button_Primary, Button_Red } from "../Inputs/button";
import SelectList from "../Inputs/selectList";

const DeleteItems: React.FC<{
  deleteItems: (event:React.SyntheticEvent) => void;
  selectedItems: string[];
  toggleDeleteItem: () => void;
  docs: ItemData[];
  addOrRemoveSelection: (selectedItem: string, selectStatus: boolean) => void;
}> = ({
  deleteItems,
  toggleDeleteItem,
  selectedItems,
  docs,
  addOrRemoveSelection,
}) => {
  const itemsToDelete = docs.filter((doc) => {
    if (selectedItems.includes(doc.id)) {
      return { id: doc.id, name: doc.name };
    }
  });

  useEffect(() => {}, [selectedItems]);

  const removeFromList = (id: string) => {
    addOrRemoveSelection(id, false);
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center items-center bg-primary-black bg-opacity-50 h-full z-50">
      <form className="text-primary-black px-4 pb-5 pt-3 bg-white w-full lg:w-2/3 lg:max-w-screen-lg mx-auto  rounded-lg">
        <div className="flex justify-between font-bold text-lg">
          <h3>Delete Item{selectedItems.length > 1 ? "s" : ""}</h3>
          <span
            className="active:text-primary-black hover:text-primary-yellow"
            onClick={toggleDeleteItem}
          >
            <Close />
          </span>
        </div>
        <h1 className="w-full h-8 flex justify-start items-center">
          {selectedItems.length > 0 && (
            <span>Are you sure you want to delete the following item</span>
          )}
          {selectedItems.length === 0 && (
            <span>There are no items on the list</span>
          )}
          {selectedItems.length > 1 ? "s" : ""}
        </h1>
        <ul className="font-bold border-2 border-primary-black h-[250px] rounded-lg overflow-y-scroll">
          {itemsToDelete.map((item) => (
            <li className="mt-1 mb-2 flex">
              <span className="mr-3">{item.id}</span>
              <span>{item.name}</span>
              <span
                onClick={(e) => removeFromList(item.id)}
                className="w-6 h-6 ml-3 text-white hover:text-primary-yellow bg-primary-black flex items-center active:bg-primary-red active:text-primary-black"
              >
                <Remove />
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-4 items-center mt-5 mb-2">
          <Button_Primary
            className="h-10 justify-center items-center px-5"
            onClick={toggleDeleteItem}
          >
            Cancel
          </Button_Primary>
          {selectedItems.length > 0 && (
            <Button_Red
              className="h-10 justify-between items-center px-3"
              onClick={deleteItems}
            >
              <span className="mr-2">Delete</span> <Delete />
            </Button_Red>
          )}
          {selectedItems.length === 0 && (
            <Button_Disabled className="h-10 justify-between items-center px-3">
              <span className="mr-2">Delete</span> <Delete />
            </Button_Disabled>
          )}
        </div>
      </form>
    </div>
  );
};

export default DeleteItems;
