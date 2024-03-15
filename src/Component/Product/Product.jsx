import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProductService } from '../../Service/ProductService';
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './Product.css';


function Product() {
  const [products, setProducts] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(4);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    ProductService.getProducts().then(data => setProducts(data));
  }, []);

  const onPageChange = event => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const handleAdd = () => {
    setNewProduct({});
    setEditMode(false);
    setDisplayDialog(true);
  };

  const handleEdit = product => {
    setSelectedProduct(product);
    setNewProduct({ ...product });
    setEditMode(true);
    setDisplayDialog(true);
  };

  const handleDelete = product => {
    const updatedProducts = products.filter(p => p.id !== product.id);
    setProducts(updatedProducts);
  };

  const saveProduct = () => {
    if (editMode) {
      const index = products.findIndex(p => p.id === selectedProduct.id);
      const updatedProducts = [...products];
      updatedProducts[index] = newProduct;
      setProducts(updatedProducts);
    } else {
      setProducts([...products, newProduct]);
    }
    setDisplayDialog(false);
  };

  const dialogFooter = (
    <div>
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
      <Button label="Cancel" icon="pi pi-times" onClick={() => setDisplayDialog(false)} />
    </div>
  );

  return (
    <div className="card" >
      <div className="product-toolbar" >
        <Button label="Add" icon="pi pi-plus" onClick={handleAdd} />
      </div>
      <div style={{ width: '100%', overflowY: 'auto', marginTop: "1rem" }}>
        <DataTable
          value={products}
          first={first}
          rows={rows}
          onPage={onPageChange}
          paginator={true}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        >
          <Column field="name" header="Name" />
          <Column field="inventoryStatus" header="Inventory Status" />
          <Column field="category" header="Category" />
          <Column field="price" header="Price" />
          <Column field="quantity" header="Quantity" />
          <Column
            body={(rowData) => (
              <div>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-mr-2" onClick={() => handleEdit(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(rowData)} />
              </div>
            )}
          />
        </DataTable>
      </div>
      <Dialog header={editMode ? 'Edit Product' : 'Add Product'} visible={displayDialog} modal={true} onHide={() => setDisplayDialog(false)} footer={dialogFooter}>
        <div className="p-grid p-fluid">
          <div className="p-col-4">
            <label htmlFor="name">Name</label>
          </div>
          <div className="p-col-8">
            <InputText id="name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          </div>
          <div className="p-col-4">
            <label htmlFor="inventoryStatus">Inventory Status</label>
          </div>
          <div className="p-col-8">
            <InputText id="inventoryStatus" value={newProduct.inventoryStatus} onChange={(e) => setNewProduct({ ...newProduct, inventoryStatus: e.target.value })} />
          </div>
          <div className="p-col-4">
            <label htmlFor="category">Category</label>
          </div>
          <div className="p-col-8">
            <InputText id="category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
          </div>
          <div className="p-col-4">
            <label htmlFor="price">Price</label>
          </div>
          <div className="p-col-8">
            <InputText id="price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          </div>
          <div className="p-col-4">
            <label htmlFor="quantity">Quantity</label>
          </div>
          <div className="p-col-8">
            <InputText id="quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} />
          </div>
        </div>
      </Dialog>

    </div>
  );
}

export default Product;
