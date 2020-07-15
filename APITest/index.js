const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express ();
mongoose
    .connect("mongodb+srv://NiquolaiSergi0:NiquolaiSergi0@cluster0-fhlqy.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connected to MongoDB server"));

app.use(cors());
app.use(express.json());
app.use("/users", require("./routes/users"))
app.use("/notices", require("./routes/notices"))
app.use("/boards", require("./routes/boards"))


app.get("/", (request, response) => {
    console.log("Mission Accomplished");
    response.send("DONE!"); // responds to when request is sent from browser
});

app.listen (5000, () => console.log("server is running on port 5000") )