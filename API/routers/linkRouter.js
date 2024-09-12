const Router = require("express").Router;
const router = Router();
const linkController = require("../controllers/linkController");

router.get("/link", linkController.readList);
router.get("/linkevento/:id", linkController.readListId);
router.get("/link/:id", linkController.read);
router.post("/link", linkController.create);
router.put("/link/:id", linkController.update);
router.delete("/link/:id", linkController.delete);

module.exports = router;
