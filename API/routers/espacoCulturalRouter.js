const Router = require("express").Router;

const router = Router();

const espacoController = require("../controllers/espacoCulturalController.js");

router.get("/espacocultural", espacoController.readList);

router.get("/espacocultural/:id", espacoController.read);

router.get("/espacoculturalsearch/:id", espacoController.search);

router.post("/espacocultural", espacoController.create);

router.put("/espacocultural/:id", espacoController.update);

router.delete("/espacocultural/:id", espacoController.delete);

module.exports = router;
