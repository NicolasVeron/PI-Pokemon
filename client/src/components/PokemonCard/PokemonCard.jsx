import React from 'react'
import { Link } from 'react-router-dom'
import colors from "../../assets/typeColors.js"
import white from "../../assets/images/white.png"
import placeholderIMG from "../../assets/images/imgnotfound.png"
import s from "./PokemonCard.module.css"

const PokemonCard = ({ id, image, name, types, createdInDb }) => {

   const imageregex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g

   return (
      <div className={s.mainContainer}>
         <Link to={`pokemon/details/${id}`} className={s.link}>
            <div className={s.contents} style={{ backgroundColor: `#${colors[types[0]]}` }}>
               {image ? <img src={white} alt="white" className={s.white} /> : ""}
               <div className={s.imgContainer}>
                  <img
                     src={image.match(imageregex) ? image : placeholderIMG}
                     style={!createdInDb ? { imageRendering: "pixelated" } : { imageRendering: "auto" }}
                     alt={`${name}`}
                  />
               </div>
               <div className={s.data}>
                  <h1>{name}</h1>
                  <h2 className={s.types}>
                     {types.map(t =>
                        <span key={t} style={{ backgroundColor: `#${colors[t]}` }} className={s.type}>{t}</span>
                     )}
                  </h2>
               </div>
            </div>
         </Link>
      </div>
   )
}

export default PokemonCard