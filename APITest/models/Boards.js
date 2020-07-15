const mongoose = require ("mongoose");
const boardSchema = new mongoose.Schema ({

    location: {
        type: String,
        required: true,
    },
    board_id: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model ("Board", boardSchema);