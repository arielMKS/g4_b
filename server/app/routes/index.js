const router = require("express").Router();
const customerRoutes = require("./customer.routes");

router.use("/api/customers", customerRoutes);

module.exports = router;
