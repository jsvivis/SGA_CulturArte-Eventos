const Router = require("express").Router;

const router = Router();

const categoriaController = require("../controllers/categoriaController");

router.get("/categoria", categoriaController.readList);

router.get("/categoria/:id", categoriaController.read);

router.get("/categoriasearch/:id", categoriaController.search);

router.post("/categoria", categoriaController.create);

router.put("/categoria/:id", categoriaController.update);

router.delete("/categoria/:id", categoriaController.delete);

module.exports = router;
