import React from "react";
import SideBar from "./SideBar";
import MainContainer from "./MainContainer";
import { Outlet } from "react-router-dom";
const Body = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
