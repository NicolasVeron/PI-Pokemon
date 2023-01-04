import React from 'react'
import Header from "../Header/Header"
import rotate from "../../assets/images/wrong.png"
import s from "./ErrorHandlers.module.css"

export const ConnectionTimedout = () => {
  
  return (
    <div className={s.homeBackground}>
    <div className={s.addedBackground}>
      <div className={s.container}>
        <div className={s.timedOut}>
        <img src={rotate} alt="rotate"/>
        <h1 className={s.message}>Something went wrong</h1>
        <button onClick={() => window.location.reload()} className={s.refresh}>TRY AGAIN</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export const HomeErrorHandler = ({errors}) => {
  return (
    <div className={s.homeBackground}>
    <div className={s.addedBackground}>
      <div className={s.container}>
        <h1 className={s.message}>{errors}</h1>
      </div>
    </div>
  </div>
  )
}

export const DetailsErrorHandler = ({errors}) => {
  return (
    <>
      <Header />
      <div className={s.detailBackground}>
        <h1 className={s.message}>{errors}</h1>
      </div>
    </>
  )
}
