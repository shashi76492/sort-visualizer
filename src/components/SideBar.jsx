// Sidebar.jsx
import React from 'react'
import { slide as Menu } from "react-burger-menu";
import { FaHome } from "react-icons/fa";
import { Button } from "react-bootstrap"

function SideBar() {
  const handleRouteChange = (route) => {
    window.location.href = route; // Force page reload
  }

  return (
    <>
      <Menu styles={{ bmBurgerBars: { width: "20px" } }}>
        <div className="sideBar">
          <div className="home">
            <FaHome size={25} style={{ marginRight: "10px" }} color='#98E4FF' />
            <h5 onClick={() => handleRouteChange('/')}>HOME</h5>
            </div>
          <div className="sorts">
            <div className="logarithmic">
              <h5>LOGARITHMIC</h5>
              <ul>
              <li onClick={() => handleRouteChange('/quick-sort')}>Quick Sort</li>
              <li onClick={() => handleRouteChange('/merge-sort')}>Merge Sort</li>
              </ul>
            </div>
            <div className="quadratic">
              <h5>QUADRATIC</h5>
              <ul>
                <li onClick={() => handleRouteChange('/bubble-sort')}>Bubble Sort</li>
                <li onClick={() => handleRouteChange('/insertion-sort')}>Insertion Sort</li>
                <li onClick={() => handleRouteChange('/selection-sort')}>Selection Sort</li>
              </ul>
            </div>
          </div>
        </div>
      </Menu>
    </>
  )
}

export default SideBar;
