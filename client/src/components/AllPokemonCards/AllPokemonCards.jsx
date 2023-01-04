import React from 'react'
import { useSelector } from 'react-redux'
import { ConnectionTimedout, HomeErrorHandler} from '../ErrorHandlers/ErrorHandlers'
import Card from "../PokemonCard/PokemonCard"
import Loader from '../Loader/Loader'
import s from "./AllPokemonCards.module.css"

const AllPokemonCards = ({ currentPokemons }) => {

  const errors = useSelector(state => state.errors)

  if (errors === "connect ETIMEDOUT") {
    return (
      <ConnectionTimedout/>
    )
  } else if (Object.keys(errors).length) {
    return (
      <HomeErrorHandler errors={errors}/>
    )
  }


  return (
    <div className={s.background}>
      <div className={s.addedBackground}>
        <div className={s.container}>
          {currentPokemons.length ? currentPokemons.map(e =>
            <Card
              key={e.id}
              id={e.id}
              image={e.image}
              name={e.name}
              types={e.types ? e.types.map(e => e.name) : e.type}
              createdInDb={e.createdInDb}
            />) : <Loader />}
        </div>
      </div>
    </div>
  )
}

export default AllPokemonCards