import Reac, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Cart = ({isAuth, setIsAuth, token, setToken}) =>{
    const[cart,setCart] = useState([])
    const[loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const fetchCart = async () =>{
        setLoading = (true)
        await fetch('http://127.0.0.1:8000/04/api-cart/cart/',{
            headers: {
                'Authorization': 'Bearer ${token}'
            }
        }
        )
        .then((res)=> res.json())
        .then((json)=>{
            if(json){
                setCart(json[0].products)
            }
        })
        .finally(()=>{
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchCart()
    },[])
    function removeFromCart(id) {
        fetch(`http://127.0.0.1:8000/api/cart/${id}/`, {
          method: 'DELETE'
        })
          .then(() => {
            const newCart = cart.filter(product => product.id !== id);
            setCart(newCart);
          })
      }
    
    const makeOrder = (item,index)=>{
        fetchCart(`http://127.0.0.1:8000/04/api-cart/cart/`, {
            method:'POST',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        fetchCart()
        navigate('/orders')
    }
    const CartBlock = cart.map(c => {
        return(
            <div className="col" key={c.id}>
                <div className="card mb-4 rounded-3 shadow-sm">
                    <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">{c.name}</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">{c.price} p. <small className="text-muted fw-light">&times; 2шт.</small></h1>
                        <p>{c.description}</p>
                        <button type="button" className="btn btn-lg btn-info mb-3">+</button>
                        <button type="button" className="btn btn-lg btn-warning mb-3">&minus;</button>
                        <button type="button" className="btn btn-lg btn-online-danger mb-3" onClick={()=>removeFromCart(c.id)}>Удалить из корзины</button>
                    </div>
                </div>
            </div>
        )
    })
}
export default Cart