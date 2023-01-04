import axios from "axios"

export const GET_POKEMON = "GET_ALL_PKMN"
export const GET_TYPES = "GET_TYPES"
export const SEARCH_BY_NAME = "SEARCH_BY_NAME"
export const POKEMON_DETAILS = "POKEMON_DETAILS"
export const CLEAR = "CLEAR"
export const NAME_SORT = "NAME_SORT"
export const ATTACK_SORT = "ATTACK_SORT"
export const TYPE_FILTER = "TYPE_FILTER"
export const POKEMON_FILTER = "POKEMON_FILTER"
export const HEADER_CLEAR = "HEADER_CLEAR"
export const HEADER_RESET = "HEADER_RESET"
export const ERROR = "ERROR"
export const DETAILS_ERROR = "DETAILS_ERROR"

export const getAllPokemon = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get("http://localhost:3001/pokemons")
            return dispatch({type: GET_POKEMON, payload: json.data})
        } catch (e) {
            dispatch({
                type: ERROR, 
                payload: e.response.data
            })
        }
    }
}

export const getAllTypes = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get("http://localhost:3001/types")
            return dispatch({type: GET_TYPES, payload: json.data})
        } catch (e) {
            console.log("types action error: ", e)
        }
    }
}

export const searchByName = (name) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            return dispatch({type: SEARCH_BY_NAME, payload: json.data})
        } catch (error) {
            dispatch({
                type: ERROR, 
                payload: error.response.data
            })
        }
    }
}

export const pokemonDetails = (id) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({type: POKEMON_DETAILS, payload: json.data})
        } catch (e) {
            dispatch({
                type: DETAILS_ERROR,
                payload: e.response.data
            })
        }
    }
}

export const createPokemon = (payload) => {
    return async () => {
        try {
            const json = await axios.post("http://localhost:3001/pokemons", payload)
            return json
        } catch (e) {
            console.log("form action error: ", e)
        }
    }
}

export const destroyPokemon = (id) => {
    return async () => {
        try {
            const json = await axios.delete(`http://localhost:3001/pokemons/${id}`)
            return json
        } catch (e) {
            console.log("destroy error: ", e)
        }
    }
}

export const sortByName = (payload) => {
    return {
        type: NAME_SORT,
        payload
    }
}

export const sortByAttack = (payload) => {
    return {
        type: ATTACK_SORT,
        payload
    }
}

export const filterByTypes = (payload) => {
    return {
        type: TYPE_FILTER,
        payload
    }
}

export const filterByPokemons = (payload) => {
    return {
        type: POKEMON_FILTER,
        payload
    }
}

export const clear = () => {
    return {
        type: CLEAR,
    }
}

export const headerIcon = () => {
    return {
        type: HEADER_RESET,
    }
}

export const headerClear = () => {
    return {
        type: HEADER_CLEAR
    }
}