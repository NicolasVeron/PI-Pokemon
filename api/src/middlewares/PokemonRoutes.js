const { Router } = require('express');
const { getAllPokemons, pokequery, pokeID, createPokemon, dbID, destroyPokemon, updatePokemon, paginate } = require('../controllers/allRoutes');
const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { name } = req.query
        if (!name) {
            const allPoke = await getAllPokemons()
            res.status(200).send(allPoke)
        } else {
            const foundPoke = await pokequery(name)
            foundPoke.length ?
                res.status(200).send(foundPoke) :
                res.status(400).json({ msg: "Pokemon not found" })
        }
    } catch (e) {
        next(e)
    }
})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params

    if (!id) res.status(400).json({msg: "Missing ID"})
    try {
        if (Number(id)) {
            const found = await pokeID(id)
            res.status(200).send(found)
        } else {
            const found = await dbID(id)
            res.status(200).send(found)
        }
    } catch (e) {
        next(e)
    }
})

router.put("/:id", async(req, res, next) => {
    const { id } = req.params
    const { image, name, hp, attack, defense, speed, types, height, weight } = req.body

    if (!id) res.status(400).send("Missing ID")
    if (!name || !hp || !attack || !defense || !speed || !types || !height || !weight) res.status(400).send("Missing data")
    try {
        await updatePokemon(id, image, name, hp, attack, defense, speed, types, height, weight)
        res.status(200).send("Updated")
    } catch (e) {
        next(err)
    }
})

router.delete("/:id", async(req, res, next) => {
    const { id } = req.params
    
    if (!id) res.status(400).send("Missing ID")
    try {
        await destroyPokemon(id)
        res.status(200).send("Done")
    } catch (err) {
        next(err)
    }

})

router.post("/", async (req, res, next) => {
    const { image, name, hp, attack, defense, speed, types, height, weight } = req.body

    //Pide solo nombre
    if (!name || !hp || !attack || !defense || !speed || !types || !height || !weight) {
        res.status(400).json({ msg: "Missing data" })
    }

    try {
        await createPokemon(image, name, hp, attack, defense, speed, types, height, weight)
        res.status(200).send("Created")
    } catch (e) {
        next(e)
    }
})

router.get("/page/:page", async (req, res, next) => {
    const { page } = req.params
    const limit = 12

    try {
        const allPoke = await getAllPokemons()
        const results = paginate(allPoke, page, limit)
        res.status(200).send(results)
    } catch (e) {
        next(e)
    }
})

module.exports = router;
