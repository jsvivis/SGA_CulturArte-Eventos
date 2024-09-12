const Router = require("express").Router;

const router = Router();

const perfilController = require("../controllers/perfilController");

router.get("/perfil", perfilController.readList);

module.exports = router;
