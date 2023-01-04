import {
   GET_POKEMON,
   GET_TYPES,
   SEARCH_BY_NAME,
   POKEMON_DETAILS,
   CLEAR,
   NAME_SORT,
   ATTACK_SORT,
   TYPE_FILTER,
   POKEMON_FILTER,
   HEADER_CLEAR,
   HEADER_RESET,
   ERROR,
   DETAILS_ERROR,
} from "../actions"

const InitialState = {
   pokemons: [],
   pokemonsBackup: [],
   pokemonDetails: {},
   allTypes: [],
   allTypesBackup: [],
   errors: {},
   detailErrors: {},
}

const rootReducer = (state = InitialState, action) => {
   switch (action.type) {
      
      case GET_POKEMON:
         return {
            ...state,
            pokemons: action.payload,
            pokemonsBackup: action.payload
         }

      case GET_TYPES:
         return {
            ...state,
            allTypes: action.payload,
            allTypesBackup: action.payload
         }

      case SEARCH_BY_NAME:
         return {
            ...state,
            pokemons: action.payload
         }

      case POKEMON_DETAILS:
         return {
            ...state,
            pokemonDetails: action.payload
         }

      case CLEAR:
         return {
            ...state,
            pokemonDetails: {}
         }

      case NAME_SORT:
         const allNames = state.pokemons.filter(e => e)
         const sortedNames = allNames.sort((a, b) => {
            if (action.payload === "asc") {
               if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
               if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
               return 0
            }
            if (action.payload === "desc") {
               if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
               if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
               return 0
            }
            return true
         })

         return {
            ...state,
            pokemons: sortedNames
         }

      case ATTACK_SORT:
         const allAttacks = state.pokemons.filter(e => e.attack)
         const sortedAttacks = allAttacks.sort((a, b) => {
            if (action.payload === "asc") {
               return a.attack - b.attack
            }
            if (action.payload === "desc") {
               return b.attack - a.attack
            }
            return true
         })

         return {
            ...state,
            pokemons: sortedAttacks
         }

      case TYPE_FILTER:
         const existentTypes = state.pokemonsBackup.filter(e => e.type) //api
         const createdTypes = state.pokemonsBackup.filter(e => e.types) //db

         const filteredApiTypes = action.payload === "all" ? state.pokemonsBackup : existentTypes.filter(e => e.type.includes(action.payload))
         const filteredDbTypes = createdTypes.filter(e => e.types.some(e => e.name.includes(action.payload)))

         const filteredTypes = filteredApiTypes.concat(filteredDbTypes)

         return {
            ...state,
            pokemons: filteredTypes
         }

      case POKEMON_FILTER:
         const filteredGame = action.payload === "all pokemon" ? state.pokemonsBackup
            : action.payload === "created" ? state.pokemonsBackup.filter(e => e.createdInDb)
               : state.pokemonsBackup.filter(e => !e.createdInDb)

         return {
            ...state,
            pokemons: filteredGame
         }

      case HEADER_CLEAR:
         return {
            ...state,
            allTypes: state.allTypesBackup,
            detailErrors: {}
         }

      case HEADER_RESET:
         return {
            ...state,
            pokemons: state.pokemonsBackup,
            allTypes: state.allTypesBackup,
            errors: {},
         }

      case ERROR:
         return {
            ...state,
            errors: action.payload
         }

      case DETAILS_ERROR:
         return {
            ...state,
            detailErrors: action.payload
         }
      default:
         return InitialState
   }
}

export default rootReducer