const router = require("express").Router();
const controller = require("../controllers/tag");
const {
  validateBody,
  validateParams,
  validateToken,
} = require("../utils/validator");
const { TagSchema, AllSchema } = require("../utils/schema");
const { saveFile } = require("../utils/gallery");

router.get("/", controller.all);
router.post(
  "/",
  validateToken,
  saveFile,
  validateBody(TagSchema),
  controller.add
);

router
  .route("/:id")
  .get(validateParams(AllSchema, "id"), controller.get)
  .patch(validateToken, validateParams(AllSchema, "id"), controller.patch)
  .delete(validateToken, validateParams(AllSchema, "id"), controller.drop);

module.exports = router;
