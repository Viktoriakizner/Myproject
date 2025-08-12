import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProduct } from '../api'

export default function Product(){
  const {id} = useParams(); const {dispatch} = useCart()
  const [data,setData]=useState(null)
  useEffect(()=>{ getProduct(id).then(setData) },[id])
  if(!data) return <div className="container">טוען…</div>
  const {product:p, quantity:qty} = data
  const out = (qty??0) <= 0
  return (
    <section className="container">
      <div className={`product ${out?'out':''}`}>
        {out && <div className="badge">אזל במלאי</div>}
        <img src={p.image_url} alt=""/>
        <div>
          <h1>{p.title}</h1>
          <p>{p.description}</p>
          <p>מחיר: {(p.price_cents/100).toFixed(2)} ₪</p>
          <button className="btn" disabled={out} onClick={()=>dispatch({type:'add', product:p})}>הוסף לעגלה</button>
        </div>
      </div>
    </section>
  )
}
