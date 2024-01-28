const router = require("express").Router();
const controller = require("../controllers/category");
const { saveFile } = require("../utils/gallery");
const { AddCat, AllSchema } = require("../utils/schema");
const {
  validateBody,
  validateParams,
  validateToken,
} = require("../utils/validator");

router.get("/", controller.all);
router.post("/", validateToken, saveFile, validateBody(AddCat), controller.add);

router
  .route("/:id")
  .get(validateParams(AllSchema, "id"), controller.get)
  .patch(validateToken, validateParams(AllSchema, "id"), controller.patch)
  .delete(validateToken, validateParams(AllSchema, "id"), controller.drop);

module.exports = router;
