const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5555;
const postRoutes = require("./routes/postRoutes");

app.use(express.static("./"))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(postRoutes);

const db = "mongodb://localhost:27017/fileuploads";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("database connected");
    } catch (err) {
        console.log(err.message);
    }
};
connectDB();
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Working on port ${port}`);
});
