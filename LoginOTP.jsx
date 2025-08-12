import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import {
  requestOtp, verifyOtp, getCurrentUser, updateUser,
  getOrders, reorder, logout
} from '../api'

export default function LoginOTP(){
  const [stage, setStage] = useState(localStorage.getItem('session') ? 3 : 1)
  const [phone, setPhone] = useState(localStorage.getItem('otp_phone') || '')
  const [code, setCode] = useState('')
  const [msg, setMsg]   = useState('')
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const [orders, setOrders] = useState([])
  const { dispatch } = useCart()

  useEffect(() => {
    if(stage===3){
      getCurrentUser().then(u => { setUser(u); setForm(u) })
      getOrders().then(setOrders)
    }
  }, [stage])

  // שליחת קוד
  const sendCode = async () => {
    if(!phone.trim()){ setMsg('נא להזין מספר טלפון'); return }
    await requestOtp(phone)
    setMsg('נשלח קוד אימות ב-SMS (מוק: 123456)')
    setStage(2)
  }

  // אימות קוד
  const doVerify = async () => {
    const ok = await verifyOtp(phone, code)
    if(ok){ setStage(3); setMsg('') }
    else   { setMsg('קוד שגוי או פג תוקף') }
  }

  // שינוי פרטים
  const saveProfile = async () => {
    const updated = await updateUser(form)
    setUser(updated)
    setEditing(false)
    setMsg('הפרטים נשמרו')
    setTimeout(()=>setMsg(''), 2000)
  }

  // הזמנה חוזרת
  const doReorder = async (orderId) => {
    const items = await reorder(orderId)
    items.forEach(i => {
      // ה-CartContext מצפה לשדה product
      dispatch({ type: 'add', product: i.product, qty: i.qty })
    })
    setMsg('הפריטים הוספו לעגלה')
    setTimeout(()=>setMsg(''), 2000)
  }

  // יציאה
  const doLogout = async () => {
    await logout()
    setStage(1); setCode(''); setMsg('התנתקת'); setTimeout(()=>setMsg(''), 1500)
  }

  if(stage===1){
    return (
      <section className="container">
        <h1>התחברות ללא סיסמה</h1>
        {msg && <div className="err" role="status" aria-live="polite">{msg}</div>}
        <div className="form">
          <label>טלפון
            <input value={phone} onChange={e=>setPhone(e.target.value)} />
          </label>
          <button className="btn" onClick={sendCode}>שלח קוד</button>
        </div>
      </section>
    )
  }

  if(stage===2){
    return (
      <section className="container">
        <h1>אימות קוד</h1>
        {msg && <div className="err" role="status" aria-live="polite">{msg}</div>}
        <div className="form">
          <label>קוד אימות
            <input value={code} onChange={e=>setCode(e.target.value)} />
          </label>
          <button className="btn" onClick={doVerify}>אימות</button>
        </div>
      </section>
    )
  }

  // stage === 3 → אזור אישי
  return (
    <section className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>האזור האישי</h1>
        <button className="link" onClick={doLogout}>יציאה</button>
      </div>

      {msg && <div className="err" role="status" aria-live="polite">{msg}</div>}

      <div className="card" style={{marginBottom:'1rem'}}>
        <h3>הפרטים שלי</h3>

        {!editing ? (
          <>
            <p><strong>שם:</strong> {user?.first_name} {user?.last_name}</p>
            <p><strong>שנת לידה:</strong> {user?.birth_year}</p>
            <p><strong>כתובת:</strong> {user?.address}</p>
            <p><strong>מייל:</strong> {user?.email}</p>
            <p><strong>טלפון:</strong> {user?.phone}</p>
            <p><strong>ת״ז:</strong> {user?.national_id}</p>
            <button className="btn" onClick={()=>setEditing(true)}>שינוי פרטים אישיים</button>
          </>
        ) : (
          <div className="form" style={{marginTop:'.75rem'}}>
            {[
              ['first_name','שם'],['last_name','שם משפחה'],['birth_year','שנת לידה'],
              ['address','כתובת'],['email','מייל'],['phone','טלפון'],['national_id','מס׳ ת״ז']
            ].map(([k, label])=>(
              <label key={k}>{label}
                <input value={form?.[k] ?? ''} onChange={e=>setForm({...form,[k]:e.target.value})}/>
              </label>
            ))}
            <div style={{display:'flex', gap:8}}>
              <button className="btn" onClick={saveProfile}>שמור</button>
              <button className="link" onClick={()=>{setEditing(false); setForm(user)}}>ביטול</button>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h3>הרכישות שלי</h3>
        {orders.length===0 ? <p>אין רכישות קודמות.</p> : (
          <ul className="cart">
            {orders.map(o=>(
              <li key={o.id} style={{gridTemplateColumns:'1fr auto'}}>
                <div>
                  <strong>הזמנה #{o.id}</strong> — {new Date(o.date).toLocaleDateString('he-IL')}
                  <div style={{fontSize:'.9rem', marginTop:4}}>
                    {o.items.map(it=>(
                      <span key={it.product.id} style={{marginInlineEnd:8}}>
                        {it.product.title} × {it.qty}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="btn" onClick={()=>doReorder(o.id)}>הזמנה חוזרת</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
