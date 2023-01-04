import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchByName } from '../../redux/actions'
import s from "./Searchbar.module.css"

const Searchbar = ({setCurrentPage}) => {

    const dispatch = useDispatch()
    const [search, setSearch] = useState("")

    const handleSearch = (e) => {
        setSearch(e)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSearch("")
        dispatch(searchByName(search))
        setCurrentPage(1)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e)
        }
    }

  return (
    <div className={s.searchbar}>
        <input type="text" value={search} onChange={e => handleSearch(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
        <button type="button" onClick={e => handleSubmit(e)}>Search</button>
    </div>
  )
}

export default Searchbar