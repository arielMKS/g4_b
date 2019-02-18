const router = require("express").Router();

const customerController = require("../controllers/customer.controller");

// handle "api/customers"

router.delete("/:id",customerController.del)
router.post("/search", customerController.search);
router.post("/", customerController.post);

router.put("/:id", customerController.update);

router.get("/:id", customerController.getById);
router.get("/", customerController.getAll);

module.exports = router;
