const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const path = require("path");
const projectRoutes = require("./routes/project.routes");
const clientRoutes = require("./routes/client.routes");
const contactRoutes = require("./routes/contact.routes");
const newsletterRoutes = require("./routes/newsletter.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/newsletters", newsletterRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
