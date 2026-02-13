const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const { createAlert, getAlerts, verifyAlert } = require("../controllers/alert.controller");

router.post("/", auth, role(["admin","authority"]), createAlert);
router.get("/", auth, getAlerts);
router.put("/:id/verify", auth, role(["admin"]), verifyAlert);

module.exports = router;   // ✅ REQUIRED
