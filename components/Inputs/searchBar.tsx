import { Search } from "@mui/icons-material";

const Searchbar = () => {
  return ( 
    <div className="h-10 w-[15rem] flex bg-primary-black rounded-full">
      <input  placeholder="Search..." type="text" className="h-full w-3/4  flex-grow bg-transparent  border-none text-white font-bold bg-primary-black focus:ring-0" />
      <button className="h-10 w-10 rounded-full flex justify-center items-center text-white bg-primary-black"><Search/></button>
    </div>
   );
}
 
export default Searchbar;