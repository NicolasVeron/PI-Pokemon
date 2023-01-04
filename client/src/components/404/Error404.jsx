import React from 'react'
import { Link } from "react-router-dom"
import lol from "../../assets/images/PCQ.png"
import s from "./Error404.module.css"

const Error404 = () => {
   return (
      <div className={s.background}>
          <div className={s.display}>
              <div>
                  <img src={lol} alt="wdsf" className={s.img} />
              </div>
              <div className={s.rightContent}>
                  <h1>404</h1>
                  <h2>Looks like you're a bit lost</h2>
                  <p className={s.text1}>How did you get in here? What did you do?</p>
                  <p className={s.text2}>It doesn't matter, you can always...</p>
                  <Link to="/home">
                      <div className={s.goBack}>TRY AGAIN</div>
                  </Link>
              </div>
              <p style={{position: "absolute", left: "4px", bottom: "-15px", color: "#474747"}}>Art made by: @PorterIllust</p>
          </div>
      </div>
  )
}

export default Error404