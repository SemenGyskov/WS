import './App.css';
import ProductList from './components/ProductList'
import React, { useState, useEffect } from 'react';
import Login from './components/Login'
import Register from './components/Register';
import Cart from './components/Cart';
import './bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Index from './components/Index';
function App() {
const [isAuth, setIsAuth] = useState(false)
const [loading, setLoading] = useState(false)
const [products, setProducts] = useState([])

const [token, setToken] = useState('')
  return (
    <div>
      <Routes>
        <Route path = '/' element={<Index isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken} token = {token} products = {products} setProducts={setProducts}/>}/>
        <Route path = '/login' element={<Login isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken} />}></Route>
        <Route path ='/register' element={<Register isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken} token = {token}/>}></Route>
        {isAuth &&(
          <>
          <Route path = '/cart' element={<Cart isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken} token={token}/>}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;