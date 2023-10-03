import React, { useState, useEffect, Fragment } from "react";
// import Textbox from "../../Inputs/textbox";
import SelectList from "../../Inputs/selectList";
import { Button_Primary as BTN, Button_Red } from "../../Inputs/button";
import { Add, List, Edit, Delete } from "@mui/icons-material";
import Searchbar from "../../Inputs/searchBar";

export const InventoryControls: React.FC<{
  extraClasses?: string;
  addItem: (event: React.SyntheticEvent) => void;
  selectedItems: string[];
  editItem: (event: React.SyntheticEvent) => void;
  toggleDeleteItemMenu: () => void;
}> = ({ extraClasses, addItem, selectedItems, editItem, toggleDeleteItemMenu }) => {
  const [categories, setCategory] = useState([
    { value: "all", option: "All" },
    { value: "groceries", option: "Groceries" },
    { value: "clothing", option: "Clothing" },
    { value: "diy", option: "DIY" },
  ]);

  const [sortby, setSortBy] = useState([
    { value: "price", option: "Price" },
    { value: "name", option: "Name" },
    { value: "id", option: "ID" },
    { value: "quantity", option: "Quantity" },
    { value: "country", option: "Country" },
    { value: "time Created", option: "Time Created" },
  ]);

  const orderby = [
    { value: "asc", option: "Ascending" },
    { value: "desc", option: "Descending" },
  ];

  const [multipleEditIsActive, setMultipleEditIsActive] = useState(false);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setMultipleEditIsActive(true);
    } else if (selectedItems.length === 0) {
      setMultipleEditIsActive(false);
    }
  }, [selectedItems]);

  return (
    <div
      className={`w-11/12 justify-center h-15 py-3 flex gap-[1.5rem] items-center ${extraClasses}`}
    >
      <SelectList
        theme="black"
        label="Category"
        options={categories}
        width="w-[10rem]"
      />
      <SelectList
        theme="black"
        label="Orderby"
        options={orderby}
        width="w-[10rem]"
      />
      <SelectList
        theme="black"
        label="Sortby"
        options={sortby}
        width="w-[10rem]"
      />
      <div className="p-0 m-0 w-min">
        <Fragment>
          {selectedItems.length === 0 && (
            <BTN
              className="w-[8rem] h-10 justify-between items-center px-3"
              onClick={addItem}
            >
              Add Item
              <Add />
            </BTN>
          )}
          {selectedItems.length === 1 && (
            <BTN
              className="w-[8rem] h-10 justify-between items-center px-3"
              onClick={editItem}
            >
              Edit Item
              <Edit />
            </BTN>
          )}
          {selectedItems.length > 1 && (
            <BTN
              className="w-[9rem] h-10 justify-between items-center px-3"
              onClick={addItem}
            >
              Edit Multiple
              <Edit />
            </BTN>
          )}
        </Fragment>
      </div>
      <div className="p-0 m-0 w-min">
        <Fragment>
          {selectedItems.length === 1 && (
            <Button_Red
              className="w-[9rem] h-10 justify-between items-center px-3"
              onClick={toggleDeleteItemMenu}
            >
              Delete Item
              <Delete />
            </Button_Red>
          )}
          {selectedItems.length > 1 && (
            <Button_Red
              className="w-[9rem] h-10 justify-between items-center px-3"
              onClick={toggleDeleteItemMenu}
            >
              Delete Items
              <Delete />
            </Button_Red>
          )}
        </Fragment>
      </div>
      <div className="p-0 m-0 w-min relative">
        <BTN className="w-[8rem] h-10 justify-between items-center px-3">
          Options
          <List />
        </BTN>
      </div>
      <Searchbar />

      <div className="flex justify-end pr-5 items-center h-10 flex-grow font-bold text-primary-black">
        Total Items: 506
      </div>
    </div>
  );
};

export default InventoryControls;
