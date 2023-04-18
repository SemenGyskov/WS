import React from "react";
import {Link} from 'react-router-dom';

const Header =({ isAuth, setIsAuth, setToken}) =>{
    return(
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
                <span className="fs-4">Just Buy</span> 
            </Link>
            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                {isAuth === false ? (
                    <>
                        <Link to="/register" className="me-3 py-2 text-dark text-decoration-none">Регистрация</Link>
                        <Link to="/login" className="me-3 py-2 text-dark text-decoration-none">Авторизация</Link>
                    </>
                ):(
                    <>
                        <Link to="/orders" className="me-3 py-2 text-dark text-decoration-none">Мои заказы</Link>
                        <Link to="/cart" className="me-3 py-2 text-dark text-decoration-none">Корзина</Link>
                        <Link to="/" className="me-3 py-2 text-dark text-decoration-none" onClick={()=> { setIsAuth(false); setToken('')}}>Выйти</Link>
                    </>
                )}
            </nav>
        </div>
    )
}

export default Header;