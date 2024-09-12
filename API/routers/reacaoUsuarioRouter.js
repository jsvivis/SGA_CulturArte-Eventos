const Router = require("express").Router;

const router = Router();

const usuarioReacaoController = require("../controllers/reacaoUsuarioController.js");

router.get("/reacaousuario", usuarioReacaoController.readList);

router.get("/reacaousuario/:id", usuarioReacaoController.read);

router.post("/reacaousuario", usuarioReacaoController.create);

router.put("/reacaousuario/:id", usuarioReacaoController.update);

router.delete("/reacaousuario/:id", usuarioReacaoController.delete);

module.exports = router;
