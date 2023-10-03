import { Dashoboard_Header as Header } from "../../../../components/UI/dashboard_header";
import Sidebar from "../../../../components/Navigation and Controls/Sidebar";

const Dashboard_Home = () => {
  return (
    <div className="min-h-screen grid grid-cols-8">
      <div className="col-span-7 h-screen flex flex-col bg-white overflow-y-scroll">
        {/* Content for the left division */}
        <Header storeTitle="Ghanaian Way Restaurant & Grocery Store" pageTitle="Home" />
        <div className="w-10/12 h-auto flex flex-col gap-20 mt-24 mx-auto  ">
          <div className="h-[500px] w-min-full flex gap-8">
            <div className="flex flex-col gap-6 w-3/12 h-full">
              <div className="w-full h-3/6 bg-primary-black rounded-xl"></div>
              <div className="flex w-full gap-6 h-3/6">
                <div className="w-1/2 h-full rounded-xl bg-primary-black"></div>
                <div className="w-1/2 h-full rounded-xl bg-primary-black"></div>
              </div>
              <div className="w-full h-2/6 bg-primary-black rounded-xl"></div>
            </div>
            <div className="w-3/12 bg-primary-black rounded-xl h-full"></div>
            <div className="w-6/12 bg-primary-black rounded-xl h-full"></div>
          </div>
          <div className="h-[500px] w-min-full mb-24 bg-primary-black rounded-xl"></div>
          <div className="h-[500px] w-min-full mb-24 bg-primary-black rounded-xl"></div>
        </div>
      </div>
      <div className="col-span-1 w-[12.5%] bg-primary-black fixed top-0 right-0 h-screen">
        {/* Content for the right division */}
        <Sidebar/>
      </div>
    </div>
  );
};

export default Dashboard_Home;

