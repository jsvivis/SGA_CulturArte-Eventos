const Router = require("express").Router;

const router = Router();

const usuarioController = require("../controllers/usuarioController");

const authController = require("../controllers/authController");

router.get("/usuario", usuarioController.readList);

router.get("/usuario/:id", usuarioController.read);

router.get("/usuariosearch/:id", usuarioController.search);

router.post("/usuario", usuarioController.create);

router.put("/usuario/:id", usuarioController.update);

router.delete("/usuario/:id", usuarioController.delete);

// rota de login
router.post('/login', authController.login);

module.exports = router;
