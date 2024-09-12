const Router = require("express").Router;

const router = Router();

const categoriaEventoController = require("../controllers/categoriaEventoController.js");

router.get("/categoriaevento", categoriaEventoController.readList);

router.get("/categoriaevento/:id", categoriaEventoController.read);

router.post("/categoriaevento", categoriaEventoController.create);

router.delete("/categoriaevento/:id", categoriaEventoController.delete);

module.exports = router;
