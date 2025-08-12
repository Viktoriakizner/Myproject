// src/pages/CategoriesPage.js
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../api'

const cats = [
  {id:1,name:'אוהלים'},{id:2,name:'תיקים'},{id:3,name:'ציוד לשטח'},{id:4,name:'ציוד לבישול'},{id:5,name:'כיסאות'}
]

export default function Categories(){
  const [sel, setSel] = useState(null)
  const [items, setItems] = useState([])
  useEffect(()=>{ getProducts(sel).then(setItems) },[sel])
  return (
    <section className="container">
      <h1>קטגוריות</h1>
      <select onChange={e=>setSel(Number(e.target.value)||null)}>
        <option value="">הכל</option>
        {cats.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <div className="grid">
        {items.map(p=> <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  )
}
