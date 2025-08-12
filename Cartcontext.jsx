import React, { createContext, useContext, useReducer } from 'react'
const Ctx = createContext()
function reducer(state, action){
  switch(action.type){
    case 'add':{
      const {product, qty=1} = action
      const exists = state.items.find(i=>i.product.id===product.id)
      const items = exists
        ? state.items.map(i=> i.product.id===product.id? {...i, qty:i.qty+qty}:i)
        : [...state.items, {product, qty}]
      return {...state, items}
    }
    case 'remove': return {...state, items: state.items.filter(i=>i.product.id!==action.id)}
    case 'inc': return {...state, items: state.items.map(i=> i.product.id===action.id? {...i, qty:i.qty+1}:i)}
    case 'dec': return {...state, items: state.items.map(i=> i.product.id===action.id? {...i, qty:Math.max(1,i.qty-1)}:i)}
    default: return state
  }
}
export function CartProvider({children}){
  const [state, dispatch] = useReducer(reducer, {items:[]})
  const total = state.items.reduce((s,i)=> s + i.product.price_cents*i.qty, 0)
  return <Ctx.Provider value={{state, dispatch, total}}>{children}</Ctx.Provider>
}
export const useCart = ()=> useContext(Ctx);
