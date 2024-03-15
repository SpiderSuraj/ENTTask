import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProductService } from '../../Service/ProductService';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

function Orders() {
  const [products, setProducts] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    ProductService.getProductsWithOrders().then(data => setProducts(data));
  }, []);

  const onPageChange = event => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const handleEdit = product => {
    setSelectedProduct(product);
    // Copy all fields of the product to newProduct state
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
    <div className="card">
      <div style={{ width: '100%', height: '91vh' }}>
        <DataTable
          value={products}
          first={first}
          rows={rows}
          onPage={onPageChange}
          paginator={true}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        >
          <Column field="id" header="Id" />
          <Column field="customername" header="Name" />
          <Column field="category" header="Category" />
          <Column field="date" header="Date" />
          <Column field="status" header="Status" />
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
            <label htmlFor="inventoryStatus">Status</label>
          </div>
          <div className="p-col-8">
            <InputText id="inventoryStatus" value={newProduct.status} onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Orders;
