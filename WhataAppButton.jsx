import React from 'react'
export default function WhatsAppButton(){
  const phone = '+972500000000' // להחליף למספר העסק
  return (
    <a className="wa" href={`https://wa.me/${phone.replace('+','')}`} target="_blank" rel="noreferrer" aria-label="צ'אט וואטסאפ">
      <img src="/wa.svg" alt="WhatsApp"/>
    </a>
  )
}
