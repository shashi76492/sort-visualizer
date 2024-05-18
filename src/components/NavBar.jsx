import React from "react";
import SideBar from "./SideBar";
import { useLocation, useNavigate } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleRouteChange = (route) => {
    window.location.href = route
  }

  return (
    <>
      <div className="sticky-container">
        <SideBar location={location} navigate={navigate} />
        <h4 style={{cursor:'pointer'}} onClick={() => handleRouteChange('/')} >SORT VISUALIZER</h4>
      </div>
    </>
  );
}

export default NavBar;
