import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import middle from "../../assets/images/middle.png"
import s from "./Pagination.module.css"

const Pagination = ({ allPokemons, pokemonsPerPage, currentPage, setCurrentPage }) => {

    const errors = useSelector(state => state.errors)

    useEffect(() => {
        window.scrollTo({ behavior: "smooth", top: "0px" })
    }, [currentPage, allPokemons])

    const paginate = (n) => {
        setCurrentPage(n)
    }

    let pageNumbers = []

    if (Object.keys(errors).length) pageNumbers = 1
    else {
        for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
            pageNumbers.push(i)
        }
    }
    
    return (
        <div className={s.pagination}>
            <div className={s.paginator}>
                {pageNumbers.length ?
                    <button disabled={currentPage - 1 <= 0} onClick={() => paginate(currentPage - 1)} className={s.arrow}>
                        <h1>{"<"}</h1>
                    </button>
                    : ""
                }
                {pageNumbers.length > 0 ?
                    <div className={s.middle}>
                        <img src={middle} alt='middle' />
                        <h1>{`BOX ${currentPage} / ${pageNumbers.length}`}</h1>
                    </div>
                    : ""}
                {pageNumbers.length ?
                    <button disabled={currentPage + 1 > pageNumbers.length} onClick={() => paginate(currentPage + 1)} className={s.arrow}>
                        <h1>{">"}</h1>
                    </button>
                    : ""
                }
            </div>
        </div>
    )
}

export default Pagination