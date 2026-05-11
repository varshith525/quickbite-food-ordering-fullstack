const { MongoClient } = require("mongodb");

require("dotenv").config();

/* MONGODB URI */

const uri = process.env.MONGODB_URI;

/* CLIENT */

const client = new MongoClient(uri);

/* CONNECT DATABASE */

client.connect()
    .then(() => {
        console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });

/* SIGNUP */

const signup = async (req, res) => {

    try {

        const { mobile, name, email } = req.body;

        const existingUser = await client
            .db("users")
            .collection("food-users")
            .findOne({
                $or: [{ mobile }, { email }]
            });

        if (existingUser) {

            return res.status(400).json({
                message: "User already registered!"
            });

        }

        const newUser = {
            mobile,
            name,
            email
        };

        await client
            .db("users")
            .collection("food-users")
            .insertOne(newUser);

        res.status(201).json({
            message: "User registered successfully!"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Signup failed!"
        });

    }

};

/* LOGIN */

const login = async (req, res) => {

    try {

        const { mobile } = req.body;

        const user = await client
            .db("users")
            .collection("food-users")
            .findOne({ mobile });

        if (!user) {

            return res.status(404).json({
                message: "User not registered!"
            });

        }

        res.status(200).json(user);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Login failed!"
        });

    }

};

module.exports = { signup, login };