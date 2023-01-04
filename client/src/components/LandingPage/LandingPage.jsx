import React from 'react'
import { Link } from "react-router-dom"
import video from "../../assets/images/Rayquaza-Pokemon.mp4"
import placeholder from "../../assets/images/LPplaceholder.png"
import s from "./LandingPage.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllPokemon, getAllTypes } from '../../redux/actions'

const LandingPage = () => {
    const allPokemons = useSelector(state => state.pokemons)
    const dispatch = useDispatch()

    useEffect(() => {
        if (allPokemons.length) {
            return
        } else {
            dispatch(getAllPokemon())
            dispatch(getAllTypes())
        }
    }, [dispatch, allPokemons.length])
    
    return (
        <div className={s.background}>
            <video className={s.video} autoPlay loop muted poster={placeholder}>
                <source src={video} type="video/mp4" />
            </video>
            <div className={s.text}>
                <h1>ポケットモンスター</h1>
                <h1>アプリ</h1>
            </div>
            <div className={s.link}>
                <Link to="/home">
                    <span>START YOUR JOURNEY</span>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage