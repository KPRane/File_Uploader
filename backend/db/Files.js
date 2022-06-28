const mongoose = require("mongoose");

const Files = mongoose.Schema({

    file: { type: String, required: true },
    filename: { type: String, required: true },
});

module.exports = mongoose.model("Files", Files);
