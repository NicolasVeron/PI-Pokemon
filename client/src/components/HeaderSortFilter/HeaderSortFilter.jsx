import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByPokemons, filterByTypes, sortByAttack, sortByName } from '../../redux/actions'
import s from "./HeaderSortFilter.module.css"

const HeaderSortFilter = ({ setCurrentPage }) => {

    const dispatch = useDispatch()
    const allTypes = useSelector(state => state.allTypes)

    const handleNameOrder = (e) => {
        e.preventDefault()
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
    }

    const handleAttackOrder = (e) => {
        e.preventDefault()
        dispatch(sortByAttack(e.target.value))
        setCurrentPage(1)
    }

    const handleTypes = (e) => {
        e.preventDefault()
        dispatch(filterByTypes(e.target.value))
        setCurrentPage(1)
    }

    const handlePokemons = (e) => {
        e.preventDefault()
        dispatch(filterByPokemons(e.target.value))
        setCurrentPage(1)
    }

    return (
        <div className={s.offCanvas}>
            <select onChange={e => handleNameOrder(e)} className={s.selector}>
                <option hidden>Order by name</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
            <select onChange={e => handleAttackOrder(e)} className={s.selector}>
                <option hidden>Order by attack</option>
                <option value="asc">Low to high</option>
                <option value="desc">High to low</option>
            </select>
            <select onChange={e => handleTypes(e)} className={s.selector}>
                <option hidden>Filter by type</option>
                <option value="all">All types</option>
                {allTypes.length && allTypes.map(e =>
                    <option value={e.name} key={e.id}>{e.name}</option>
                )}
            </select>
            <select onChange={e => handlePokemons(e)} className={s.selector}>
                <option hidden>Filter by pokemon</option>
                <option value="all pokemon">All pokemon</option>
                <option value="api">Existent</option>
                <option value="created">Created</option>
            </select>
        </div>
    )
}

export default HeaderSortFilter