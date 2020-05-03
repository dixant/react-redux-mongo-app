const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require('cors');

const API_PORT = 3005;
const app = express();

//Modals 
const Deployment = require('./modal/Deployment');

//false mangoose pluralize
mongoose.pluralize(null);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const router = express.Router();

//it includes username , password and databse name.
const dbUri = "mongodb+srv://dixant:water!sg00d@cluster0-zpw3x.mongodb.net/reduxMongoApp?retryWrites=true&w=majority";
mongoose.connect(dbUri, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;


// connect through mongo client this is optional 
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(dbUri, { useNewUrlParser: true });


db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(logger("dev"));


db.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

router.get("/", (req, res) => {
    res.json({ message: "Hello Dixant Sharma" });
});
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
getDateFunction = (date) => {
    let myDate = new Date(date);
    let year = myDate.getFullYear();
    let month = months[myDate.getMonth()];
    let day = myDate.getDate();
    return `${day}-${month}-${year}`
}

router.get("/getDeployments", (req, res) => {
    console.log('req ', req.body);

    Deployment.find({}, (err, data) => {
        if (err || !data) return res.status(400).json({
            success: false,
            message: "No Data Exist"
        });
        let newData = data.map(({ _id, url, templateName, version, createdAt, updatedAt }) => {
            return {
                _id, url, templateName, version, createdAt: getDateFunction(createdAt), updatedAt
            }
        })
        return res.json({ success: true, data: newData });
    });
});


router.post("/addDeployment", (req, res) => {
    console.log('req ', req.body);
    new Deployment(req.body)
        .save((err, data) => {
            if (err) return res.json({ success: false, err })
            console.log(data + " Added to Deployment collection.");
          let {_id, url, templateName, version, createdAt, updatedAt} = data;
            let newData = {
                _id, url, templateName, version, createdAt: getDateFunction(createdAt), updatedAt
            }


            return res.json({ success: true, data:newData })
        });


});

router.post("/deleteDeployment", (req, res) => {
    console.log('req ', req.body);
    let { body: { _id } } = req;
    Deployment.deleteOne({ _id }, function (err, data) {
        if (err) return console.error(err);
        console.log(data + " delete Deployment from collection.");
        return res.json({ success: true, data })
    })

});

app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON UHH PORT ${API_PORT}`));