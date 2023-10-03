import Textbox from "../Inputs/textbox";
import FormContainer from "../formContainer";
import {
  Button,
  Button_Disabled,
  Button_Primary,
  Button_Red,
} from "../Inputs/button";
import {
  Add,
  PhotoLibrary,
  ChevronRight,
  Close,
  ChevronLeft,
} from "@mui/icons-material";
import ItemData from "../../Interfaces/itemData";
import { useState, useRef, Fragment } from "react";
import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";
import { SegmentedProgressBar as Bar } from "../UI/segmentedProgressBar";
import CheckBox from "../Inputs/checkbox";
import { TextArea as Description } from "../Inputs/textArea";
import blobToBase64 from "../../util/blobToBase64";
import SelectList from "../Inputs/selectList";
import { listInput as List } from "../Inputs/listInput";
import { countries } from "../../util/countries";

export const QuickAddItem: React.FC<{
  toggleAddItemMenu: (event: React.SyntheticEvent) => void;
  addItem: (data: ItemData) => void;
}> = ({ toggleAddItemMenu, addItem }) => {
  const formReference = useRef<HTMLFormElement | null>(null);
  const [fullFormIsToggled, setFullFormIsToggled] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);

  const Countries = countries.map((country) => {
    return { value: country.name, option: country.name };
  });

  const location = [
    { value: "online", option: "Online" },
    { value: "in store", option: "In Store" },
    { value: "Online and In Store", option: "Online and In Store" },
  ];

  const pricingType = [
    { value: "variable", option: "Variable" },
    { value: "fixed", option: "Fixed" },
    { value: "per unit", option: "Per Unit" },
  ];

  const categories = [
    { value: "groceries", option: "Groceries" },
    { value: "beverage", option: "Beverage" },
    { value: "snacks", option: "Snacks" },
    { value: "bread", option: "Bread" },
    { value: "fabrics", option: "Fabrics" },
    { value: "beauty & health", option: "Beauty & Health" },
    { value: "freezer & fridge Items", option: "Freezer & Fridge Items" },
  ];

  const goToNext = (event: React.SyntheticEvent) => {
    //takes you to the next form
    event.preventDefault();
    setCurrentStep(currentStep + 1);
  };

  //takes you to the previous form
  const goToPrev = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  const [itemData, setItemData] = useState<ItemData>({
    image: "",
    id: "ST" + uuid().slice(0, 8),
    name: "",
    altName: "",
    quantity: 1,
    price: 0,
    pricingType: "Variable",
    cost: 0,
    tax: 0,
    sku: "",
    productCode: "",
    location: "online",
    isActive: false,
    track: false,
    description: "",
    brand: "",
    year: 1999,
    country: "Ghana",
    importID: "",
    discount: 0,
    tags: [],
    category: "",
    imported: false,
    created: Timestamp.fromDate(new Date()),
    lastModified: Timestamp.fromDate(new Date()),
  });

  const submitForm = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const formData = {
      ...itemData,
      altName:
        itemData.altName.trim().length === 0 ? itemData.name : itemData.altName, //set altname based on name if altname is not given.
      price: itemData.price === 0 ? 1.1 * itemData.cost : itemData.price, // set price based on cost if price is not given.
      cost: itemData.cost === 0 ? 0.9 * itemData.price : itemData.cost, // set cost based on price if price is not given.
    };

    addItem(formData);
  };

  const toggleFullForm = () => {
    setFullFormIsToggled(!fullFormIsToggled);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const formData = { ...itemData, description: event.target.value };
    setItemData(formData);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = { ...itemData, name: event.target.value };
    setItemData(formData);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = { ...itemData, price: +event.target.value };
    setItemData(formData);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = { ...itemData, quantity: +event.target.value };
    setItemData(formData);
  };

  const handleAltNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = { ...itemData, altName: event.target.value };
    setItemData(formData);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const formData = { ...itemData, category: event.target.value };
    setItemData(formData);
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const formData = { ...itemData, country: event.target.value };
    setItemData(formData);
  };

  const handlePricingTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const formData = { ...itemData, pricingType: event.target.value };
    setItemData(formData);
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const formData = { ...itemData, location: event.target.value };
    setItemData(formData);
  };

  const handleTags = (value: string[]) => {
    const formData = { ...itemData, tags: value };
    setItemData(formData);
  };

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = { ...itemData, cost: +event.target.value };
    setItemData(formData);
  };

  const handleTaxAndFeesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = { ...itemData, tax: +event.target.value };
    setItemData(formData);
  };

  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = { ...itemData, discount: +event.target.value };
    setItemData(formData);
  };

  const handleSKUChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = { ...itemData, sku: event.target.value };
    setItemData(formData);
  };

  const handleTrackChange = (checked: boolean) => {
    const formData = { ...itemData, track: checked };
    setItemData(formData);
  };

  const handleIsActiveChange = (checked: boolean) => {
    const formData = { ...itemData, isActive: checked };
    setItemData(formData);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      blobToBase64(file).then((imgURL: unknown) => {
        setItemData({ ...itemData, image: imgURL as string });
        // console.log(imgURL);
      });
    }
  };

  const handleBrandNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = { ...itemData, brand: event.target.value };
    setItemData(formData);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = { ...itemData, year: +event.target.value };
    setItemData(formData);
  };

  return (
    <Fragment>
      {!fullFormIsToggled && currentStep === 1 && (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center bg-primary-black bg-opacity-50 h-full z-50">
          <form
            ref={formReference}
            className="text-primary-black px-4 pb-5  bg-white min-w-[500px] rounded-lg"
          >
            <div className="h-8 w-full text-primary-black flex justify-between items-center font-bold">
              <h3>Add Item</h3>
              <span
                className="text-xl text-primary-black hover:text-primary-red active:text-primary-black"
                onClick={toggleAddItemMenu}
              >
                <Close />
              </span>
            </div>
            <div className="flex w-full py-8 gap-2">
              <Textbox
                label="Item Name"
                theme="black"
                value={itemData.name}
                onChange={handleNameChange}
                type="text"
              />
              <div className="w-[150px]">
                <Textbox
                  label="Price"
                  value={itemData.price}
                  onChange={handlePriceChange}
                  theme="black"
                  type="number"
                  prefix="$"
                />
              </div>
              <div className="w-[150px]">
                <Textbox
                  label="Quantity"
                  theme="black"
                  value={itemData.quantity}
                  onChange={handleQuantityChange}
                  type="number"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              {itemData.name.trim().length > 1 && itemData.price > 0 && (
                <Button_Primary
                  className="h-10 justify-between items-center px-3"
                  onClick={submitForm}
                >
                  Add <Add />
                </Button_Primary>
              )}
              {itemData.name.trim().length === 0  && (
                <Button_Disabled className=" h-10 justify-between items-center px-3">
                  Add <Add />
                </Button_Disabled>
              )}
              <Button
                className="w-[6rem] h-10 justify-center items-center px-3"
                onClick={toggleFullForm}
              >
                More Info
              </Button>
              <Button_Red
                className="w-[6rem] h-10 justify-center items-center px-3"
                onClick={toggleAddItemMenu}
              >
                Cancel
              </Button_Red>
            </div>
          </form>
        </div>
      )}

      {fullFormIsToggled && (
        <div className="absolute top-0 left-0 w-full flex justify-center items-center bg-primary-black bg-opacity-50 h-full z-50">
          <form
            ref={formReference}
            className="text-primary-black px-4 pb-5 pt-3 bg-white w-full lg:w-2/3 lg:max-w-screen-lg mx-auto  rounded-lg"
          >
            <div className="flex justify-between font-bold text-lg">
              <h3>Add Item</h3>
              <span
                className="active:text-primary-black hover:text-primary-yellow"
                onClick={toggleAddItemMenu}
              >
                <Close />
              </span>
            </div>
            <div className="flex items-end h-10  justify-center ">
              <Bar
                className="w-[250px] gap-3"
                segments={2}
                currentStep={currentStep}
                color="primary-yellow"
              />
            </div>
            {/* first block */}
            {currentStep === 1 && (
              <Fragment>
                <div className="h-24 flex items-center gap-4">
                  <div className="w-4/12">
                    <Textbox
                      label="Item Name"
                      value={itemData.name}
                      onChange={handleNameChange}
                      theme="black"
                      type="text"
                    />
                  </div>
                  <div className="w-4/12">
                    <Textbox
                      label="Alternate Name"
                      value={itemData.altName}
                      onChange={handleAltNameChange}
                      theme="black"
                      type="text"
                    />
                  </div>
                  <div className="w-3/12">
                    <Textbox
                      label="ID"
                      value={itemData.id}
                      theme="black"
                      type="text"
                      onChange={(e) => {}}
                    />
                  </div>
                  <div className="w-2/12">
                    <Textbox
                      label="Price"
                      theme="black"
                      onChange={handlePriceChange}
                      value={itemData.price}
                      type="number"
                      prefix="$"
                    />
                  </div>
                </div>
                {/* second block */}
                <div className="h-24 flex items-center gap-4">
                  <div className="w-2/12">
                    <Textbox
                      label="Cost"
                      theme="black"
                      value={itemData.cost}
                      onChange={handleCostChange}
                      type="number"
                      prefix="$"
                    />
                  </div>
                  <div className="w-4/12">
                    <SelectList
                      label="Pricing Type"
                      theme="black"
                      options={pricingType}
                      value={itemData.pricingType}
                      onChange={handlePricingTypeChange}
                    />
                  </div>
                  <div className="w-2/12">
                    <Textbox
                      label="Tax and Fees"
                      value={itemData.tax}
                      onChange={handleTaxAndFeesChange}
                      theme="black"
                      type="number"
                      suffix="%"
                    />
                  </div>
                  <div className="w-2/12">
                    <Textbox
                      label="Discount"
                      value={itemData.discount}
                      onChange={handleDiscountChange}
                      theme="black"
                      type="number"
                      suffix="%"
                    />
                  </div>
                  <div className="w-3/12">
                    <SelectList
                      label="Location"
                      value={itemData.location}
                      theme="black"
                      options={location}
                      onChange={handleLocationChange}
                    />
                  </div>
                </div>
                {/* Third block */}
                <div className="h-24 flex items-center gap-4">
                  <div className="w-2/12">
                    <Textbox
                      label="SKU"
                      value={itemData.sku}
                      onChange={handleSKUChange}
                      theme="black"
                      type="text"
                    />
                  </div>
                  <div className="flex w-2/12">
                    <CheckBox
                      id="isActive"
                      checked={itemData.isActive}
                      onChange={handleIsActiveChange}
                      className="mr-2"
                    />
                    <span>Show as active</span>
                  </div>
                  <div className="flex w-2/12">
                    <CheckBox
                      id="track"
                      checked={itemData.track}
                      onChange={handleTrackChange}
                      className="mr-2"
                    />
                    <span>Track stock</span>
                  </div>
                </div>

                {/* fourth block (description) */}
                <div className="h-36 flex items-center">
                  <Description
                    value={itemData.description}
                    theme="black"
                    label="Description"
                    onChange={handleDescriptionChange}
                  ></Description>
                </div>

                {/* fifith block */}
                <div className="flex justify-end items-center h-24">
                  <Button_Primary
                    className="justify-between px-3 pr-1 mr-6 h-10 items-center"
                    onClick={goToNext}
                  >
                    Next <ChevronRight />
                  </Button_Primary>
                  <Button_Red
                    className="justify-between px-3 pr-1  h-10 items-center text-white"
                    onClick={toggleAddItemMenu}
                  >
                    Cancel <ChevronRight />
                  </Button_Red>
                </div>
              </Fragment>
            )}

            {currentStep === 2 && (
              <Fragment>
                <div className="h-[27rem] overflow-clip flex">
                  <div className="w-[250px] h-[200px] border-2 border-primary-black rounded-lg overflow-hidden self-center">
                    <label htmlFor="photo">
                      {itemData.image === "" && (
                        <span className="flex h-full">
                          <PhotoLibrary className="w-full h-full" />
                        </span>
                      )}
                      {itemData.image.length > 3 && (
                        <img src={itemData.image} />
                      )}
                      {true && (
                        <input
                          type="file"
                          onChange={handleImageSelect}
                          id="photo"
                          name="photoUrl"
                          multiple={false}
                          className="hidden"
                          // value={blob}
                        />
                      )}
                    </label>
                  </div>
                  <div className="flex flex-grow ml-3 flex-col justify-center">
                    <div className="h-24 flex items-start gap-4">
                      <div className="w-2/12">
                        <Textbox
                          label="Quantity"
                          value={itemData.quantity}
                          onChange={handleQuantityChange}
                          theme="black"
                          type="number"
                        />
                      </div>
                      <div className="w-3/12">
                        <Textbox
                          label="Brand Name"
                          value={itemData.brand}
                          onChange={handleBrandNameChange}
                          theme="black"
                          type="text"
                        />
                      </div>
                      <div className="w-3/12">
                        <SelectList
                          label="Category"
                          theme="black"
                          options={categories}
                          value={itemData.category}
                          onChange={handleCategoryChange}
                        />
                      </div>
                      <div className="w-3/12">
                        <SelectList
                          label="Country"
                          theme="black"
                          options={Countries}
                          value={itemData.country}
                          onChange={handleCountryChange}
                        />
                      </div>
                    </div>
                    <div className="h-24 flex items-start gap-4">
                      <div className="w-2/12">
                        <Textbox
                          label="Product Year"
                          theme="black"
                          type="number"
                          value={itemData.year}
                          onChange={handleYearChange}
                        />
                      </div>
                      <div className="w-4/12">
                        <List
                          label="Tags"
                          theme="black"
                          value={itemData.tags}
                          onUpdate={handleTags}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* fifith block */}
                <div className="flex justify-end items-center h-24">
                  <Button_Primary
                    className="justify-between px-3 pr-1 mr-6 h-10 items-center"
                    onClick={goToPrev}
                  >
                    Previous <ChevronLeft />
                  </Button_Primary>
                  {itemData.name.trim().length > 0 && itemData.price != 0 && (
                    <Button
                      className="justify-between px-3 pr-1  h-10 items-center text-primary-black"
                      onClick={submitForm}
                    >
                      Add <Add />
                    </Button>
                  )}
                  {itemData.name.trim().length === 0 && (
                    <Button_Disabled className="justify-between px-3 pr-1  h-10 items-center text-primary-black">
                      Add <Add />
                    </Button_Disabled>
                  )}
                </div>
              </Fragment>
            )}
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default QuickAddItem;
