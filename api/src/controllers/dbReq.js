const { Pokemon, Type } = require('../db.js')

const DbReq = async () => {
    const allPkmn = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"],
            through: {attributes: []}
        }
    })
    return allPkmn
}

module.exports = {
    DbReq
}