const Router = require("express").Router;

const router = Router();

const reacaoController = require("../controllers/reacaoController.js");

router.get("/reacao", reacaoController.readList);

router.get("/reacao/:id", reacaoController.read);

router.get("/reacaosearch/:id", reacaoController.search);

router.post("/reacao", reacaoController.create);

router.put("/reacao/:id", reacaoController.update);

router.delete("/reacao/:id", reacaoController.delete);

module.exports = router;
