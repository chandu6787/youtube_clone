import React from "react";
import SideBar from "./SideBar";
import Head from "./Head";
import { Outlet } from "react-router-dom";
const Body = () => {
  return (
    <div>
      <Head />
      <div className="flex">
        <SideBar />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;
