import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import logo from '../../assets/download.jpg';
import { ProductService } from '../../Service/ProductService';
import ChartComponent from './ChartComponent';



function Dashboard() {
  const [products, setProducts] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [costProducts, setCostProducts] = useState(0);
  const [costOrders, setCostOrders] = useState(0);
  const [chartarray,setchartarray] = useState([])

  useEffect(() => {
    ProductService.getProductsWithOrdersSmall().then((data) => setOrders(data));
  }, []);

  useEffect(() => {
    ProductService.getProducts().then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const totalCost = products.reduce((acc, curr) => acc + curr.price, 0);
    setCostProducts(totalCost);
  }, [products]);
  useEffect(() => {
    const totalCost = Orders.reduce((acc, curr) => acc + curr.amount, 0);
    setCostOrders(totalCost);
  }, [products]);
  
  useEffect(() => {
    const chartData = products.map(product => ({
      name: product.name,
      value: product.quantity 
    }));
   setchartarray(chartData)
    console.log(chartData);
  }, [products]);
  
 
  console.log(costProducts,costOrders);

  return (
    <div className="dash-wrapper">
      <div className="cards">
        <div
          style={{
            width: '100%',
            height: '40%',
            background: 'lightblue',
            borderRadius: '0.3rem',
            textAlign: 'center',
            border: '1px solid #fff',
          }}
        ></div>
        <div style={{ width: '100%', height: '60%', display: 'flex',flexWrap:"wrap" }}>
          <p style={{ fontWeight: '700', color: 'gray', width: '50%' }}>Total Products</p>
          <p style={{ fontWeight: '0' , width: '50%'}}>{products.length} Products</p>
          <p style={{ fontWeight: '700', color: 'gray', width: '50%' }}>Total cost </p>
          <p style={{ fontWeight: '0', width: '50%' }}>{costProducts}</p>
        </div>
      </div>
      <div className="cards">
        <div
          style={{
            width: '100%',
            height: '40%',
            background: 'lightblue',
            borderRadius: '0.3rem',
            textAlign: 'center',
            border: '1px solid #fff',
          }}
        ></div>
        <div style={{ width: '100%', height: '60%', display: 'flex',flexWrap:"wrap" }}>
          <p style={{ fontWeight: '700', color: 'gray', width: '50%' }}>Total Order</p>
          <p style={{ fontWeight: '0' , width: '50%'}}>{Orders.length}Orders</p>
          <p style={{ fontWeight: '700', color: 'gray', width: '50%' }}>Total cost </p>
          <p style={{ fontWeight: '0', width: '50%' }}>{costOrders}</p>
        </div>
      </div>
      <div style={{width:"100%",background:"#fff",height:"55vh",borderRadius:"0.5rem",padding:"0.3rem"}}>
        <ChartComponent chartarray={chartarray} />
      </div>
    </div>
  );
}

export default Dashboard;
