const { getDetails, query } = require('./ApiReq')
const { Pokemon, Type } = require('../db.js')
const { apiReq } = require("./ApiReq")
const { DbReq } = require("./dbReq")

const getAllPokemons = async () => {
    const api = await apiReq()
    const db = await DbReq()
    const res = api.concat(db)
    return res
}

const pokequery = async (name) => {

    const db = await DbReq()
    const foundFromDb = db.find(e => e.name.toLowerCase() === name.toLowerCase())

    if (!foundFromDb) {
        const res = await query(name)
        return res
    } else return [foundFromDb.dataValues]
}

const pokeID = async (id) => {
    const res = await getDetails(id)
    return res
}

const dbID = async (id) => {
    const db = await DbReq()
    const found = db.find(e => e.id === id)
    return found
}

const createPokemon = async (image, name, hp, attack, defense, speed, types, height, weight) => {

    const createdPokemon = await Pokemon.create({
        name,
        image,
        weight,
        height,
        hp,
        attack,
        defense,
        speed
    })

    const typesDb = await Type.findAll({
        where: { name: types }
    })

    createdPokemon.addTypes(typesDb)
}

const updatePokemon = async (id, image, name, hp, attack, defense, speed, types, height, weight) => {
    
    const foundPkmn = await Pokemon.findOne({
        where: {id: id}
    })

    await foundPkmn.set({
        image,
        name,
        hp, 
        attack, 
        defense, 
        speed, 
        types, 
        height, 
        weight
    })

    foundPkmn.save()
}

const destroyPokemon = async (id) => {
    await Pokemon.destroy({
        where: {
            id: id
        }
    })
}

const paginate = (model, page, limit) => {

    const firstIndex = (page - 1) * limit
    const lastIndex = page * limit
 
    const results = {}      
 
    if (firstIndex > 0) {           
       results.previous = {        
          page: Number(page) - 1,
          limit: Number(limit)
       }
    }
 
    if (lastIndex < model.length) { 
       results.next = {            
          page: Number(page) + 1,
          limit: Number(limit)
       }
    }
 
    results.results = model.slice(firstIndex, lastIndex)
 
    return results
 }

module.exports = {
    getAllPokemons,
    pokequery,
    pokeID,
    dbID,
    createPokemon,
    updatePokemon,
    destroyPokemon,
    paginate
}