import { Home, Inventory2 } from "@mui/icons-material";
import Link from "next/link";

const Sidebar = () => {
  const userID = "asdkfja;lsdkjf"

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full p-4 ">
        <div className="rounded-full w-20 mx-auto h-20 bg-red-300 mb-2"></div>
        <p className=" w-full text-center mb-2 text-white font-bold mx-auto">
          userName
        </p>
        <p className=" w-full text-center mb-2 text-gray-400 font-bold mx-auto">
          StoreName
        </p>
      </div>

      <div className="w-full">
        {/* Main Links */}
        <ul className="w-full h-min">
          <li className="flex justify-center w-full text-primary-yellow py-2 ">
            <Link href={`/auth/${userID}/dashboard/`} legacyBehavior>
              <a className="flex  justify-center items-center w-3/4 overflow-hidden">
                <span className="w-1/4">
                  <Home />
                </span>{" "}
                <span className="w-3/4">Home</span>
              </a>
            </Link>
          </li>
          <li className="flex justify-center w-full text-primary-yellow py-2 ">
            <Link href={`/auth/${userID}/dashboard/inventory`} legacyBehavior>
              <a className="flex justify-center items-center w-3/4 overflow-hidden">
                <span className="w-1/4">
                  <Inventory2 />
                </span>{" "}
                <span className="w-3/4">Inventory</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
