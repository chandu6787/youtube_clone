import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const SideBar = () => {
  const isMenuOpen=useSelector((store)=>store.config.isMenuOpen)
  if(!isMenuOpen)
    return null;
  return (
    <div className="m-2 p-5  shadow-lg w-48">
      <h1 className="font-bold">Subscriptions</h1>
      <ul>
       <Link to="/" > <li>Home</li></Link>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
       <h1 className="font-bold">Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
       <h1 className="font-bold">Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
    </div>
  );
};

export default SideBar;
