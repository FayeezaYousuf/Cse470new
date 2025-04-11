import React from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";
import { useUserContext } from "@/context/userContext";

function Sidebar() {
  const { logoutUser } = useUserContext();
  return (
    <div className="w-[20rem] mt-[5rem] h-[calc(100%-5rem)] fixed right-0 top-0 bg-[#c3acce] flex flex-col overflow-y-auto">
      <Profile /> 
      <div className="mt-4 mx-6">
        <RadialChart />
      </div>

      <button
        className="mt-auto mb-6 mx-6 py-4 px-8 bg-[#f5d3c5] text-black font-bold text-lg rounded-[50px] hover:bg-[#a26769] hover:text-white transition duration-200 ease-in-out"
        onClick={logoutUser}
      >
        Sign Out
      </button>

    </div>
  );
}

export default Sidebar;
