import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPokemon, getAllTypes } from '../../redux/actions'
import PokemonCards from "../AllPokemonCards/AllPokemonCards"
import Header from '../Header/Header'
import Pagination from '../Pagination/Pagination'
import SortFilter from '../SortFilter/SortFilter'
import s from "./Home.module.css"

const Home = () => {

  const allPokemons = useSelector(state => state.pokemons)

  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsPerPage] = useState(12)
  const firstIndex = (currentPage - 1) * pokemonsPerPage
  const lastIndex = currentPage * pokemonsPerPage

  const currentPokemons = allPokemons.slice(firstIndex, lastIndex)


  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" })
    if (allPokemons.length) {
      return
    } else {
    dispatch(getAllPokemon())
    dispatch(getAllTypes()) 
    }
  }, [dispatch, allPokemons.length])

  return (
    <div className={s.background}>
      <div className={s.test}>
        <Header 
        setCurrentPage={setCurrentPage}/>
      </div>
      <div className={s.display}>
        {allPokemons.length? 
        <div className={s.leftContainer}>
          <SortFilter setCurrentPage={setCurrentPage}/>
        </div> : ""}
        <div className={s.rightContainer}>
          <div className={s.rightContainerdiv}>
            <div className={s.cont}>
              <Pagination
                allPokemons={allPokemons.length}
                pokemonsPerPage={pokemonsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
              <PokemonCards
                currentPokemons={currentPokemons}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home