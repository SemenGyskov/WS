import React, { useState, useEffect } from 'react';

function ProductList() {
  const [data, setData] = useState([])
  const [token, setToken] = useState('418d7334acddf72fcf15686c0009e4766be7c9c0')
  const [products, setProducts] = useState([])
  const gettingProduct = async (event) => {
  const api_url = await fetch('http://127.0.0.1:8000/api/products/',
  {headers: {
  'content-type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${token}`,
  },}
  )
  const datas = await api_url.json();
  console.log(datas)
  setData(datas.data)
  }
  useEffect(() => {
  gettingProduct()
  },[])
  console.log(data)
  //function handleUpdateProduct(id, name, price, description) {
  //  fetch(`http://127.0.0.1:8000/api/product/${id}/`, {
  //    method: 'PACH',
  //    headers: {
  //      'Content-Type': 'application/json'
  //    },
  //    body: JSON.stringify({ name: name, price: price, description: description })
  //  })
  //  .then(response => response.json())
  //  .then(data => {
  //    const index = products.findIndex(product => product.id === id);
  //    const newProducts = [...products];
  //    newProducts[index] = data;
  //    setProducts(newProducts);
  //  })
  //}
  
  function handleCreateProduct(name, price, description) {
    fetch('http://127.0.0.1:8000/04/api-cart/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, price: price, description: description })
    })
    .then(response => response.json())
    .then(data => {
      fetch('http://127.0.0.1:8000/04/api-cart/products/', {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setData(data.data);
        setProducts(data.data);
      });
    });
  }
  function handleDeleteProduct(id) {
      fetch(`http://127.0.0.1:8000/04/api-cart/product/${id}/`, {
        method: 'DELETE'
      })
        .then(() => {
          const newProducts = products.filter(product => product.id !== id);
          setProducts(newProducts);
        })
    }
  
  const rezult = data.map(data =>{
  return <ul key ={data.id}>
  Продукт № {data.id}
  <li classname='li'>Название товара: <b>{data.name}</b></li>
  <li classname='li'>Описание товара: {data.description}</li>
  <li classname='li'>Цена товара: {data.price}</li>
  <button onClick={() => handleDeleteProduct(data.id)}>Удалить товар</button>
  <hr/>
  </ul>
  })
    return (
      <div>
      <h1>Список продуктов</h1>
       {rezult}
  
       <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = event.target.name.value;
            const price = event.target.price.value;
            const description = event.target.description.value;
            handleCreateProduct(name, price, description);
            event.target.reset();
          }}
        >
          <input classname = 'input' type="text" name="name" placeholder="Название" required />
          <input classname = 'input' type="number" name="price" placeholder="Цена" required />
          <input classname = 'input' type='text' name="description" placeholder="Описание" required />
          <button type="submit">Создать товар</button>
        </form>
      </div>
    );
  }
  
  export default ProductList;
  