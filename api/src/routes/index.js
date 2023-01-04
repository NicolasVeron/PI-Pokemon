const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pkmnRoutes = require("../middlewares/PokemonRoutes")
const typeRoutes = require("../middlewares/TypeRoutes")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pkmnRoutes)
router.use("/types", typeRoutes)


module.exports = router;
