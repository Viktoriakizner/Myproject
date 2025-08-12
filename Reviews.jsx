import React, { useEffect, useState } from 'react'
import { getReviews } from '../api'   // לוקח מהמוקים ב-src/mocks

export default function Reviews(){
  const [list, setList] = useState([])
  const [me, setMe] = useState({ user_name:'', content:'' })

  // טוען תגובות מהמוק
  useEffect(() => {
    getReviews().then(setList)
  }, [])

  // הוספת תגובה חדשה (מוק מקומי בלבד)
  const add = () => {
    if (!me.user_name.trim() || !me.content.trim()) return
    const newReview = {
      id: Date.now(),
      user_name: me.user_name,
      content: me.content,
      likes: 0,
      dislikes: 0
    }
    setList([newReview, ...list])
    setMe({ user_name:'', content:'' })
  }

  // לייק/דיסלייק מקומי
  const vote = (id, kind) => {
    setList(prev =>
      prev.map(x =>
        x.id === id
          ? { ...x, likes: x.likes + (kind === 'like' ? 1 : 0),
                    dislikes: x.dislikes + (kind === 'dislike' ? 1 : 0) }
          : x
      )
    )
  }

  return (
    <section className="container">
      <h1>תגובות הלקוחות</h1>
      <div className="form">
        <input
          placeholder="שם"
          value={me.user_name}
          onChange={e=>setMe({...me, user_name:e.target.value})}
        />
        <textarea
          placeholder="התגובה שלך"
          value={me.content}
          onChange={e=>setMe({...me, content:e.target.value})}
        />
        <button className="btn" onClick={add}>הוסף תגובה</button>
      </div>

      <ul className="reviews">
        {list.map(r => (
          <li key={r.id}>
            <strong>{r.user_name}</strong>
            <p>{r.content}</p>
            <button onClick={()=>vote(r.id,'like')}>👍 {r.likes}</button>
            <button onClick={()=>vote(r.id,'dislike')}>👎 {r.dislikes}</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
