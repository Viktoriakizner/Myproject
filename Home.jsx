// Home.jsx
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../api'

export default function Home(){
  const [items, setItems] = useState([])
  useEffect(()=>{ getProducts().then(setItems) },[])
  return (
    <section className="container">
      <h1>מבצעים של החודש · מוצרים חמים</h1>
      <div className="grid">
        {items.slice(0,8).map(p=> <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  )
}
