// ProductCard.js
import React from 'react'
import { Link } from 'react-router-dom'
export default function ProductCard({p, qty}){
  const out = (qty ?? 0) <= 0
  return (
    <div className={`card ${out? 'out':''}`}>
      {out && <div className="badge">אזל במלאי</div>}
      <img src={p.image_url} alt={p.title} />
      <h3>{p.title}</h3>
      <p>{(p.price_cents/100).toFixed(2)} ₪</p>
      <Link to={`/product/${p.id}`} className="btn" aria-disabled={out}>לפרטים</Link>
    </div>
  )
}
