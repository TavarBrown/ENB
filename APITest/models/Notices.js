const mongoose = require ("mongoose");
const noticeSchema = new mongoose.Schema ({

    notice_id: {
        type: String,
        required: true,
        unique:true
    },
    user: {
        type: String,
        required: true,
    },
    image: String,

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    audio: String,

    startDate: {
        type: Date,
        required: true
    },
    stopDate: Date,

    location: {
        type: String,
        required: true
    },
    approved:{
        type: Boolean,
        //required: true,
        default: false
    }
        

})
module.exports = mongoose.model ("Notice", noticeSchema);