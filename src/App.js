import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { CgProfile } from "react-icons/cg";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import Header from './Component/Header/Header';
import Dashboard from './Component/Dashboard/Dashboard';
import Product from './Component/Product/Product';
import Orders from './Component/OrderIteam/Orders';
import Calender from './Component/Calender/Calender';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",marginLeft:"2%",gap:"2%"}}>
          <div className='header-dash'>
          <IoNotificationsCircleOutline style={{ width: "25px",height:"25px" }} />
            <div className='header-profile'><CgProfile /></div>
          </div>
          <div style={{}}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product" element={<Product />} />
              <Route path="/order" element={<Orders />} />
              {/* <Route path="/calender" element={<Calender/>} /> */}
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
