const router = require("express").Router();
const controller = require("../controllers/comment");
const { validateToken, validateBody } = require("../utils/validator");
const { CommentSchema } = require("../utils/schema");

router.get("/", controller.all);
router.post("/", validateBody(CommentSchema), controller.add);
router.delete("/:id", validateToken, controller.drop);

module.exports = router;
