import React, { useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';


const Register = ({ isAuth, setIsAuth, token, setToken}) => {
    const navigate = useNavigate()
    const[name, setName] = useState('')
    const[password, setPassword] = useState('')
    const[email, setEmail] = useState('')
    const[error,setError] =useState('')

    const onSubmit = async (event) => {
        event.preventDefault()
        const data = {
            fio: name,
            email: email,
            password: password,
        }
        let response = await fetch(`http://127.0.0.1:8000/04/api-cart/signup/`,{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let answer = await response.json()
        if(response.ok){
            navigate('/login')
        }else{
            console.log(answer.error.message)
            setError(answer.error.message)
        }
    }
    return (
        <div className='container py-3'>
            <header>
                <Header isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken}/>
                <div className='pricing-header p-3 pb-m4 mx-auto text-center'>
                    <h1 className='display-4 fw-normal'>Регистрация</h1>
                </div>
            </header>
            <main>
                <div className='row row-cols-1 row-cols-md-3 mb-3 text-center justify-center'>
                    <div className='col'>
                        <div className='row'>
                            <form action='' onSubmit={onSubmit}>
                                <h1 className='h3 mb-2 fw-normal'>Пожалуйста, заполните все поля</h1>
                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control' onChange={(event)=>setName(event.target.value)} id='floatingFio' placeholder='Фио' value={name}/>
                                    <label htmlFor='floatingInput'>ФИО</label>
                                </div>
                                <div className='form-floating mb-3'> 
                                    <input type='email' className='form-control' onChange={(event)=>setEmail(event.target.value)} id='floatingInput' placeholder='email@email.com' value={email}/>
                                    <label>Email</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input type='password' className='form-control' onChange={(event)=>setPassword(event.target.value)} id='floatungUnput' placeholder='password' value={password} />
                                    <label>Password</label>
                                </div>
                                <button className='w-100 btn btn-lg btn-primart mb-3' type='submit'>Зарегистрироваться</button>
                                <button className='w-100 btn btn-lg btn-outline-info' type='submit' onClick={()=>navigate('/')}>Назад</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Register;