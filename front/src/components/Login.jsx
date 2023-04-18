import React, { useState } from "react";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom'

const Login = ({ isAuth, setIsAuth, setToken})=> {
    const navigate = useNavigate()
    const[loading,setLoading] = useState("")
    const[password,setPassword] = useState("")
    const[error, setError] = useState("")
    const[name, setName] = useState()

    const onSubmit = async (event) => {
        event.preventDefault();
        const data ={
            email: name,
            password: password
        }
        let response = await fetch('http://127.0.0.1:8000/04/api-cart/login/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json', }       
        })
        let answer = await response.json()
        if(response.ok){
            setToken(answer.data.user_token)
            setIsAuth(true)
            navigate('/')
        }else{
            console.log(answer.error.message)
            setError(answer.error.message)
        }
    }

    return(
        <div className="container py-3">
            <header>
                <Header isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken} />
                <div className="pricing-header p-3 pb-m4 mx-auto text-center">
                    <h1 className="display-4 fw-normal">Авторизация</h1>
                </div>
            </header>
            <main>
                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
                    <div className="col">
                        <div className="row">
                            <form action="" onSubmit={onSubmit}>
                                <div className="form-floating mb-3">
                                    <input type='email' className="form-control" onChange={(event)=>setName(event.target.value)} id='floatingInput' placeholder="name@example.com" value={name} />
                                    <label htmlFor="floatingInput">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" onChange={(event)=>setPassword(event.target.value)} id='floatingPassword' placeholder="Password" value={password}/>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <p>{error}</p>
                                <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">Войти</button>
                                <button className="w-100 btn btn-lg btn-outline-info" type="submit" onClick={()=>navigate('/')}>Назад</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Login;
