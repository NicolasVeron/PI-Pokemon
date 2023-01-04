import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { headerClear, headerIcon } from '../../redux/actions'
import Searchbar from '../Searchbar/Searchbar'
import HeaderSortFilter from '../HeaderSortFilter/HeaderSortFilter'
import icon from "../../assets/images/favicon.ico"
import s from "./Header.module.css"

const Header = ({ setCurrentPage }) => {

  const allPokemons = useSelector(state => state.pokemons)
  const [active, setActive] = useState(false)
  const errors = useSelector(state => state.errors)
  const dispatch = useDispatch()

  const path = window.location.pathname

  const handleRefresh = () => {
    if (path === "/home") {
      errors === "connect ETIMEDOUT" ?
        window.location.reload() :
        dispatch(headerIcon())
    } else if (path.includes("/pokemon/details/")) {
      dispatch(headerClear())
    } else {
      return
    }
  }

  const handleDisplay = () => {
    setActive(!active)
  }

  return (
    <div className={s.container}>
      <div className={s.icon}>
        <Link to="/home" onClick={() => handleRefresh()}>
          <img src={icon} alt="icon" />
        </Link>
      </div>
      <Link to="#" onClick={() => handleDisplay()} className={s.toggle}>
        <span></span>
        <span></span>
        <span></span>
      </Link>
      {/* A ocultar */}
      <div className={active ? s.activeNavBarLinks : s.navBarLinks}>
        <div className={s.createContainer}>
          <Link to="/pokemon/create"><h1>Hide on bush</h1></Link>
        </div>
        {/* No mostrar si no cargo nada */}
        {allPokemons.length && path === "/home" ?
          <div className={s.hidden}>
            <div className={s.searchbar}>
              <Searchbar setCurrentPage={setCurrentPage} />
            </div>
            <div className={s.sortFilter}>
              <HeaderSortFilter setCurrentPage={setCurrentPage} />
            </div>
          </div>
          : ""}
      </div>
    </div>
  )
}

export default Header