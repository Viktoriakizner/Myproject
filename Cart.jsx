import React from 'react'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api'
export default function Cart(){
  const {state, dispatch, total} = useCart()
  return (
    <section className="container">
      <h1>העגלה שלי</h1>
      {state.items.length===0 && <p>העגלה ריקה.</p>}
      <ul className="cart">
        {state.items.map(({product, qty})=> (
          <li key={product.id}>
            <img src={product.image_url} alt=""/>
            <div>
              <h3>{product.title}</h3>
              <p>{(product.price_cents/100).toFixed(2)} ₪</p>
            </div>
            <div className="qty">
              <button onClick={()=>dispatch({type:'dec', id:product.id})}>-</button>
              <span>{qty}</span>
              <button onClick={()=>dispatch({type:'inc', id:product.id})}>+</button>
            </div>
            <button className="link" onClick={()=>dispatch({type:'remove', id:product.id})}>הסר</button>
          </li>
        ))}
      </ul>
      <div className="checkout">
        <div>סך הכל: {(total/100).toFixed(2)} ₪</div>
        <a href="/checkout" className="btn">לתשלום</a>
      </div>
    </section>
  )
}
