const Router = require("express").Router;
const router = Router();
const imagemController = require("../controllers/imagemController");

router.get("/imagem", imagemController.readList);
router.get("/imagem/:id", imagemController.read);
router.post("/imagem", imagemController.create);
router.put("/imagem/:id", imagemController.update);
router.delete("/imagem/:id", imagemController.delete);

module.exports = router;
