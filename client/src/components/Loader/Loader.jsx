import React from 'react'
import quagsire from "../../assets/images/quagsire.gif"
import s from "./Loader.module.css"

export const Loader = () => {
  return (
    <div className={s.container}>
        <img src={quagsire} alt="quagsire"/>
        <h1>LOADING</h1>
    </div>
  )
}

export default Loader
