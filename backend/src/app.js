const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/alerts", require("./routes/alert.routes"));
app.use("/api/reports", require("./routes/report.routes"));
app.use("/api/help", require("./routes/help.routes"));
app.use("/api/volunteer", require("./routes/volunteer.routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
