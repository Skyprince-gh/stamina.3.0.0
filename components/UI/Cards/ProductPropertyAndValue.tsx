
export const ProductPropertyAndValue: React.FC<{propertyName:string; value: any | unknown | undefined}> = (props) => {
  return ( 
    <div className="h-full items-start w-full flex flex-col justify-start overflow-hidden mr-10">
      <h1 className="text-primary-yellow font-bold">{props.propertyName}</h1>
      <p className="text-white">{props.value}</p>
    </div >
   );
}
 
export default ProductPropertyAndValue;