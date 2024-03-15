import React, { useState } from 'react';
import logo from "../../assets/download.jpg";
import { Link } from 'react-router-dom';
import './Header.css'; 
import { RxDashboard } from "react-icons/rx";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoReorderFour } from "react-icons/io5";

function Header() {
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <aside>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <Link to="/" onClick={() => handleTabClick('Dashboard')} style={{ textDecoration: "none" }}>
          <p className={`side-name ${activeTab === 'Dashboard' ? 'active' : ''}`}>
            <RxDashboard />
            Dashboard
          </p>
        </Link>
        <Link to="/product" onClick={() => handleTabClick('Product')} style={{ textDecoration: "none" }}>
          <p className={`side-name ${activeTab === 'Product' ? 'active' : ''}`}>
            <MdProductionQuantityLimits />
            Product
          </p>
        </Link>
        <Link to="/order" onClick={() => handleTabClick('Order')} style={{ textDecoration: "none" }}>
          <p className={`side-name ${activeTab === 'Order' ? 'active' : ''}`}>
            <IoReorderFour />
            Order
          </p>
        </Link>
      </nav>
    </aside>
  );
}

export default Header;
