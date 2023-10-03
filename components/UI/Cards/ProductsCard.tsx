import { useState, Fragment, useEffect } from "react";
import { ExpandMore, ExpandLess, Edit } from "@mui/icons-material";
import { ProductPropertyAndValue as PropVal } from "./ProductPropertyAndValue";
import { ItemData as CardData } from "../../../Interfaces/itemData";
import Checkbox from "../../Inputs/checkbox";
import { format } from "date-fns";
import { truncateText as trunc } from "../../../util/truncate";
import Button from "../../Inputs/button";
interface CardComponentProps {
  data: CardData;
  currentCard?: string;
  determinecurrentExpansion: (cardID: string) => void;
  toggleEdit: () => void;
  addOrRemoveSelection: (
    selectedItem: string,
    selectionStatus: boolean
  ) => void;
  selectedItems: string[];
}

export const ProductsCard: React.FC<CardComponentProps> = ({
  data,
  currentCard,
  determinecurrentExpansion,
  toggleEdit,
  addOrRemoveSelection,
  selectedItems,
}) => {
  const [expanded, setExpanded] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    addOrRemoveSelection(data.id.trim(), checked);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (data.id.trim() === currentCard) {
      setExpanded(true);
    } else {
      setExpanded(false);
    } 

    if(!selectedItems.includes(data.id)){
      setIsChecked(false)
    }
    
  }, [currentCard, selectedItems]);

  const convertFirebaseTimestampToDate = (timestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    if (
      timestamp &&
      typeof timestamp === "object" &&
      "seconds" in timestamp &&
      "nanoseconds" in timestamp
    ) {
      const milliseconds =
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
      return format(new Date(milliseconds), "do MMMM,yyyy");
    } else {
      return null; // Return null if the input is not a valid Firebase Timestamp
    }
  };

  return (
    <Fragment>
      {!expanded && (
        <div className="flex w-full hover:w-[110%] hover:bg-primary-black hover:rounded-full overflow-hidden hover:text-white bg-white h-12 relative hover:bottom-[9px] mb-2 border-b justify-start items-center border-primary-black">
          <div className="flex w-full hover:w-[90.9%] h-full mx-auto items-center bg-transparent">
            <Checkbox
              id={data.id}
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="ml-2 mr-10"
            />
            <img
              src={
                data.image.length === 0
                  ? "https://img.icons8.com/ios/50/product--v1.png"
                  : data.image
              }
              alt={data.name}
              className="h-full w-12 mb-1 border rounded-sm mr-10"
            />
            <div className="flex gap-10 items-center min-w-max flex-grow">
              <p className="flex w-1/6 text-sm font-bold">{data.id}</p>
              <p className="flex w-1/6 text-sm font-bold">{data.name}</p>
              <p className="flex w-1/6 text-sm font-bold">
                {data.quantity} in stock
              </p>
              <p className="flex w-1/6 text-sm font-bold">{data.price}</p>
              <p className="flex w-1/6 text-sm font-bold">{data.sku}</p>
              <p className="flex w-2/6 text-sm font-bold">{data.description}</p>
            </div>
            <div
              className=" flex items-center justify-center h-full w-10"
              onClick={(e) => {
                toggleExpand();
                determinecurrentExpansion(data.id);
              }}
            >
              <ExpandMore />
            </div>
          </div>
        </div>
      )}
      {expanded && (
        <div className="flex w-[110%] flex-col pt-2 bg-primary-black mb-2 h-[270px] rounded-3xl">
          <div className="h-12 w-[90.9%] self-center flex justify-between text-white items-center relative">
            <Checkbox
              id={data.id}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            {selectedItems.length <= 1 && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  toggleEdit();
                }}
                className="h-10 px-3 w-20 flex justify-between items-center absolute right-16 text-primary-black self-end"
              >
                Edit <Edit />
              </Button>
            )}
            <div
              className="flex items-center justify-center justify-self-end h-full  w-10"
              onClick={toggleExpand}
            >
              <ExpandLess />
            </div>
          </div>
          <div className="h-12 w-[90.9%] flex-grow self-center flex text-white items-center pb-4">
            <img
              src={
                data.image.length === 0
                  ? "https://img.icons8.com/ios/50/product--v1.png"
                  : data.image
              }
              alt={data.name}
              className="h-full w-36 mr-4"
            />
            <div className="flex flex-col h-full w-full">
              <div className="w-full  h-1/3 flex justify-between">
                <PropVal
                  propertyName="Product Name"
                  value={trunc(data.name, 80)}
                />
                <PropVal propertyName="Product Price" value={data.price} />
                <PropVal propertyName="Discount" value={data.discount} />
                <PropVal propertyName="Sizes" value={data.tags} />
              </div>
              <div className="w-full h-1/3 flex justify-between">
                <PropVal propertyName="ID Number" value={data.id} />
                <PropVal
                  propertyName="Product Year"
                  value={convertFirebaseTimestampToDate(data.created)}
                />
                <PropVal propertyName="SKU | Barcode" value={data.sku} />
                <PropVal propertyName="Tags" value={data.tags} />
              </div>
              <div className="w-full h-1/3 flex justify-between">
                <PropVal propertyName="Brand" value={data.brand} />
                <PropVal propertyName="Country" value={data.country} />
                <PropVal propertyName="Quantity" value={data.quantity} />
                <PropVal
                  propertyName="Description"
                  value={data.description}
                />{" "}
                {/* */}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductsCard;
