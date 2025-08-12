import React from 'react'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api'
export default function Checkout(){
  const {state, total} = useCart()
  const submit = async ()=>{
    const payload = { phone: '0501234567', items: state.items.map(i=>({id:i.product.id, qty:i.qty})) }
    const r = await ('http://localhost:8080/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
    if(r.ok) alert('הזמנה בוצעה! קבלה נשלחה במייל ובנייד (Stub).')
  }
  return (
    <section className="container">
      <h1>תשלום</h1>
      <p>סכום לתשלום: {(total/100).toFixed(2)} ₪</p>
      <button className="btn" onClick={submit}>בצע הזמנה</button>
    </section>
  )
}
