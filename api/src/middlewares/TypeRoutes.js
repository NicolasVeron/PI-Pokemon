const { Router } = require('express');
const { typeReq } = require('../controllers/ApiReq');
const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const allTypes = await typeReq()
        res.status(200).send(allTypes)
    } catch (e) {
        next(e)
    }
})


module.exports = router;
