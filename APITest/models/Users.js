const mongoose = require ("mongoose");
const userSchema = new mongoose.Schema ({

    user_id:{
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    email_address: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        //required: true,
        default: false
    },
    location_accessible: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model ("User", userSchema);