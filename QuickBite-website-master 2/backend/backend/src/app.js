const express = require("express");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const { MongoClient } = require("mongodb");

const cors = require("cors");
const bodyParser = require("body-parser");

/* EXPRESS APP */

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* MONGODB CONNECTION */

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

client.connect()
    .then(() => {
        console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });

/* ROUTES */

app.use("/api", userRoutes);

/* SERVER */

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;