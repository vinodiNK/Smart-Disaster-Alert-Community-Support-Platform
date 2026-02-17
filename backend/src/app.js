const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("app.js loaded");

// Correct route path
const reportRoutes = require(path.join(__dirname, "routes", "report.routes.js"));
app.use("/api/report", require("./routes/report.routes"));

// You can keep your other routes
// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/alerts", require("./routes/alert.routes"));
// app.use("/api/help", require("./routes/help.routes"));
// app.use("/api/volunteer", require("./routes/volunteer.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
