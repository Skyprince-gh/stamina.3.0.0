import { ProductsCard as Card } from "../Cards/ProductsCard";
import { PageViewControls as View } from "../../special_components/pageViewControls";
import React, { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import fetchDocuments from "../../../util/fetchDocuments";
import { current } from "@reduxjs/toolkit";
import ItemData from "../../../Interfaces/itemData";

const PaginatedListView: React.FC<{
  documents: ItemData[];
  toggleEdit: () => void;
  determineCurrentExpansion: (cardID:string) => void;
  currentExpandedCard:string;
  addOrRemoveSelection:(selectedItem:string, selectionStatus:boolean) => void;
  selectedItems: string[];
}> = ({
  documents,
  toggleEdit,
  determineCurrentExpansion,
  currentExpandedCard, 
  addOrRemoveSelection, 
  selectedItems,
}) => {
  let documentList = null;

  const [currentDocs, setCurrentDocs] = useState([...documents].slice(0, 25));
  const [index, setIndex] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const changePage = (pageNumber: number) => {
    const startIndex = pageNumber * 25 - 1;
    const endIndex = pageNumber * 25 - 1 + 25;
    const current = documents.slice(startIndex, endIndex);
    console.log("current", current);
    setCurrentDocs(current);
    setIndex(pageNumber);
    setPageNumber(pageNumber);
  };

  useEffect(() => {
    changePage(index);
  }, [documents, selectedItems]);

  documentList = (
    <div className="w-10/12 h-auto z-0 flex items-center flex-col mt-3 mx-auto mb-20 shadow-lg relative">
      {currentDocs.map((product: any) => (
        <Card
          key={product.id}
          determinecurrentExpansion={determineCurrentExpansion}
          currentCard={currentExpandedCard}
          data={product}
          toggleEdit={toggleEdit}
          addOrRemoveSelection={addOrRemoveSelection}
          selectedItems = {selectedItems}
        />
      ))}
      <View pageNumber={pageNumber} loadPageList={changePage} />
    </div>
  );

  return documentList;
};

export default PaginatedListView;
