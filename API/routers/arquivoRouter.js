const Router = require("express").Router;
const router = Router();
const arquivoController = require("../controllers/arquivoController");
const upload = require('../middleware/upload.js'); //

router.get("/arquivo", arquivoController.readList);
router.get("/arquivo/:id", arquivoController.read);
router.post("/arquivo", upload.single('arquivo'), arquivoController.create);
router.put("/arquivo/:id", arquivoController.update);
router.delete("/arquivo/:id", arquivoController.delete);

module.exports = router;
