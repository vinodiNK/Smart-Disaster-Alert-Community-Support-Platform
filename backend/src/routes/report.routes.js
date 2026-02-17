const express = require("express");
const router = express.Router();

console.log("report.routes.js loaded");

// POST /api/reports
router.post("/", (req, res) => {
  const { description, location } = req.body;

  if (!description || !location) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // For now, we just log and return success
  const newReport = {
    id: Date.now(),
    description,
    location,
    status: "pending"
  };

  console.log("New report received:", newReport);

  res.status(201).json({
    message: "Report submitted successfully",
    report: newReport
  });
});

module.exports = router;
