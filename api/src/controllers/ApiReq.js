const axios = require("axios")

const firstToUppercase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const apiReq = async () => {
    try {
        const placeholder = async (n) => {
            const apiReq = await axios.get(`https://pokeapi.co/api/v2/pokemon/${n}/`)
            const data = apiReq.data
            return data
        }

        let all = []
        // <= 386 - - - entire 3rd gen
        // original limit: 292
        for (let i = 252; i <= 292; i++) {
            let data = await placeholder(i)
            all.push(data)
        }

        const infoMap = all.map(e => {
            return {
                id: e.id,
                name: firstToUppercase(e.name),
                image: e.sprites.front_default,
                type: e.types.map(e => firstToUppercase(e.type.name)),
                attack: e.stats[1].base_stat,
                //Traer lo necesario para el home
            }
        })
        return infoMap
    } catch (err) {
        //Error mas posible
        throw new Error("connect ETIMEDOUT")
    }
}

const typeReq = async () => {
    const typesURL = await axios.get("https://pokeapi.co/api/v2/type")
    const typesResult = await typesURL.data.results
    const typesInfo = typesResult.map((e, i) => {
        return {
            id: i + 1,
            name: firstToUppercase(e.name)
        }
    })
    return typesInfo
}

const getDetails = async (id) => {

    try {
        const json = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const data = json.data

        return {
            id: data.id,
            name: firstToUppercase(data.name),
            image: data.sprites.versions["generation-v"]["black-white"].animated.front_default ?
                data.sprites.versions["generation-v"]["black-white"].animated.front_default :
                data.sprites.versions["generation-v"]["black-white"].front_default,
            type: data.types.map(e => firstToUppercase(e.type.name)),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
        }
    } catch (e) {
        if (e.message.includes("ETIMEDOUT")) {
            throw Error("Connection timedout, try refreshing")
        } 
        else throw Error(e.message)
    }
}

//Busqueda individual
const query = async (name) => {
    try {
        const url = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=251&limit=41")
        const foundData = url.data.results.find(e => e.name.toLowerCase() === name.toLowerCase())
        if (!foundData) throw Error("Pokemon not found")
        const foundID = foundData.url.slice(34, -1)
        const found = await getDetails(foundID)
        return [found]
    } catch (err) {
        if (err.message.includes("ETIMEDOUT")) {
            throw Error("Connection timedout, maybe try again?")
        } 
        else throw Error(err.message)
    }
}

module.exports = {
    apiReq,
    query,
    getDetails,
    typeReq
}