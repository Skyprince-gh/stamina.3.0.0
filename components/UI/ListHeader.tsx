const ListHeader = () => {
  return (
    <div className="flex w-10/12 items-center px-2 h-10">
      <span className=" w-4 mr-10">#</span>
      <span className="mb-1 mr-[4.7rem]"></span>
      <div className="flex gap-10 items-center min-w-max flex-grow">
        <span className="flex w-1/6 text-[1rem] font-bold">ID</span>
        <span className="flex w-1/6 text-[1rem] font-bold">Name</span>
        <span className="flex w-1/6 text-[1rem] font-bold">Quantity</span>
        <span className="flex w-1/6 text-[1rem] font-bold">Price</span>
        <span className="flex w-1/6 text-[1rem] font-bold">SKU/Barcode</span>
        <span className="flex w-2/6 text-[1rem] font-bold">Description</span>
      </div>
      <div className="w-10"></div>
    </div>
  );
};

export default ListHeader;
