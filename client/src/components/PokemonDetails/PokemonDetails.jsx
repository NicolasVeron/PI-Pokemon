import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Link } from 'react-router-dom'
import { clear, destroyPokemon, pokemonDetails } from '../../redux/actions'
import colors from "../../assets/typeColors.js"
import Header from '../Header/Header'
import Loader from '../Loader/Loader'
import { DetailsErrorHandler } from '../ErrorHandlers/ErrorHandlers'
import placeholderIMG from "../../assets/images/imgnotfound.png"
import s from "./PokemonDetails.module.css"

const PokemonDetails = () => {

   const pokemon = useSelector(state => state.pokemonDetails)
   const errors = useSelector(state => state.detailErrors)

   const imageregex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g

   const dispatch = useDispatch()
   const history = useHistory()
   const { id } = useParams()

   useEffect(() => {
      dispatch(pokemonDetails(id))
      window.scrollTo(0, 0)
      return () => {
         dispatch(clear())
      }
   }, [dispatch, id])

   const onDestroy = (e) => {
      e.preventDefault()
      dispatch(destroyPokemon(id))
      history.push("/home")
      history.go(0)
      alert("Pokemon being deleted...")
   }

   //Serebii : 52.2kg || api: 522
   const accurateStats = (model) => {
      const leftModel = model.toString().slice(0, -1)
      const rightModel = model.toString().slice(-1)
      return `${leftModel ? leftModel : 0}.${rightModel}`
   }

   if (Object.keys(errors).length) {
      return (
         <DetailsErrorHandler errors={errors}/>
      )
   }

   return (
      <div>
         <Header />
         <div className={s.background}>
            {Object.keys(pokemon).length ?
               <div className={s.container}>
                  {!pokemon.createdInDb ?
                     <div className={s.arrows}>
                        <div>
                           <Link to={`/pokemon/details/${Number(id) - 1}`} className={s.leftArrow}>{"<"}</Link>
                           <Link to={`/pokemon/details/${Number(id) - 10}`}>-10</Link>
                        </div>
                        <div>
                           <Link to={`/pokemon/details/${Number(id) + 10}`}>+10</Link>
                           <Link to={`/pokemon/details/${Number(id) + 1}`} className={s.rightArrow}>{">"}</Link>
                        </div>
                     </div> : ""
                  }
                  <div className={s.up}>
                     <div className={s.imageContainer}>
                        <img 
                        src={pokemon.image === null ? "" : pokemon.image.match(imageregex) ? pokemon.image : placeholderIMG} 
                        style={!pokemon.createdInDb? {imageRendering: "pixelated"} : {imageRendering: "auto", width: "auto"}}
                        alt={pokemon.name} 
                        className={s.imageRes} />
                     </div>
                     <div className={s.innerUp}>
                        <h1>#{pokemon.id}</h1>
                        <h1>{pokemon.createdInDb ? pokemon.name : pokemon.name.toUpperCase()}</h1>
                        <h2>
                           {pokemon.types ? pokemon.types.map(t =>
                              <span key={t.name} style={{ backgroundColor: `#${colors[t.name]}` }} className={s.types}>{t.name}</span>
                           ) : pokemon.type.map(t =>
                              <span key={t} style={{ backgroundColor: `#${colors[t]}` }} className={s.types}>{t}</span>)}
                        </h2>
                        <div className={s.center}>
                           <div className={s.hw}>
                              <div>
                                 <h2>HT</h2>
                                 <h2>WT</h2>
                              </div>
                              <div>
                                 <h2>{accurateStats(pokemon.height)}m</h2>
                                 <h2>{accurateStats(pokemon.weight)}kg</h2> {/* 466 = 46.6 || 2405 = 240.5 */}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className={s.down}>
                     <div className={s.stats}>
                        <div className={s.statNames}>
                           <h2>HP</h2>
                           <h2>ATTACK</h2>
                           <h2>DEFENSE</h2>
                           <h2>SPEED</h2>
                        </div>
                        <div className={s.statData}>
                           <h2>{pokemon.hp}/{pokemon.hp}</h2>
                           <h2>{pokemon.attack}</h2>
                           <h2>{pokemon.defense}</h2>
                           <h2>{pokemon.speed}</h2>
                        </div>
                     </div>
                     {pokemon.createdInDb ?
                        <div className={s.deleteContainer}>
                           <button onClick={(e) => onDestroy(e)}>Delete</button>
                        </div> :
                        ""}
                  </div>
               </div> : <Loader />
            }
         </div>
      </div>
   )
}

export default PokemonDetails