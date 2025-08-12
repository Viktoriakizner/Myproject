import React, { useState } from 'react'
import { z } from 'zod'
import { getProducts } from '../api'
const currentYear = new Date().getFullYear()
const registerSchema = z.object({
  first_name: z.string().min(2).regex(/[\p{L} ]+/u, 'שם בעברית/אותיות בלבד'),
  last_name:  z.string().min(2).regex(/[\p{L} ]+/u, 'שם משפחה בעברית/אותיות בלבד'),
  birth_year: z.string().regex(/^\d{4}$/,'שנה בת 4 ספרות').refine(y=>+y<=currentYear,'שנה עד השנת הנוכחית'),
  address:    z.string().min(5),
  email:      z.string().regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,'מייל באנגלית תקין'),
  phone:      z.string().regex(/^0\d{8,10}$/,'מספר טלפון ישראלי'),
  national_id:z.string().regex(/^\d{9}$/,'ת"ז בת 9 ספרות')
})
export default function Register(){
  const [form, setForm] = useState({first_name:'',last_name:'',birth_year:'',address:'',email:'',phone:'',national_id:''})
  const [errors, setErrors] = useState({})
  const onChange = e => setForm({...form, [e.target.name]: e.target.value})
  const onSubmit = e => {
    e.preventDefault()
    const res = registerSchema.safeParse(form)
    if(!res.success){
      const map = {}
      res.error.issues.forEach(i=> map[i.path[0]] = i.message)
      setErrors(map); return
    }
    setErrors({}); alert('נרשמת בהצלחה! כעת ניתן להתחבר עם OTP במספר הטלפון.');
    // TODO: לשלוח לשרת ולשמור משתמש
  }
  return (
    <section className="container">
      <h1>הרשמה</h1>
      <form onSubmit={onSubmit} className="form">
        {['first_name','last_name','birth_year','address','email','phone','national_id'].map(k=> (
          <label key={k}>{label(k)}
            <input name={k} value={form[k]} onChange={onChange}/>
            {errors[k] && <span className="err">{errors[k]}</span>}
          </label>
        ))}
        <button className="btn">הרשמה</button>
      </form>
    </section>
  )
}
function label(k){
  return ({first_name:'שם',last_name:'שם משפחה',birth_year:'שנת לידה',address:'כתובת',email:'מייל',phone:'טלפון',national_id:'מספר ת"ז'})[k]
}
