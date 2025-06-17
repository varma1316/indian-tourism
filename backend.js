const express= require("express");
const app = express();
const port = 3000;

var m=require("mongoose");
var bodyParser = require("body-parser");

app.use(bodyParser.json())

app.set('view engine','ejs');
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: true}));

m.connect("mongodb://35.207.220.185:27017/Tourism")
 .then(() => console.log("Connected to MongoDB on GCP VM"))
 .catch(err => console.error("MongoDB connection error:", err));

const st={

    monument:String,
    how_many:String,
    arrivals:String
}
const st1={

    email:String,
    password:String
    // arrivals:String
}


const st2={

    name:String,
    email:String,
    feed:String
    
}

const counterSchema = new m.Schema({
    count: {
        type: Number,
        default: 0 
    }
});


const Counter = m.model('Counter', counterSchema);
const Student=m.model("data1", new m.Schema(st, { collection: "data1" }));
const Student1=m.model("login", new m.Schema(st1, { collection: "login" }));
const Student2=m.model("form", new m.Schema(st2, { collection: "form" }));



app.get("/", function(req, res) {
    
    Counter.findOneAndUpdate({}, { $inc: { count: 1 } }, { upsert: true })
        .then(result => {
        
            return Counter.findOne({});
        })
        .then(counter => {
            var count = counter ? counter.count : 0;
            // Render the homepage and pass the count to the template
            res.render("preview", { count: count });
        })
        .catch(err => {
            console.error("Error:", err);
            // You might want to handle this error appropriately
            res.status(500).send("Internal Server Error");
        });
});

app.get("/feedback1.html",function(req,res){
    res.sendFile(__dirname+"/feedback1.html");
})


app.get("/student",function(req,res){
    Student2.find({}).then(function(data){
        res.render("student",{
        datalist:data 
        })
    }).catch(function(err){
        console.log("there is an error");
    })
})

app.post("/form1",function(req,res){
    const newst2=new Student2({
        name:req.body.name,
        email:req.body.email,
        feed:req.body.feed
    })
    newst2.save();
    res.redirect("/feedback1.html")
        
    
})


app.post("/storedata",function(req,res){
const newst=new Student({
    // monument:req.body.monumentte,
    monument:req.body.monument,
    how_many:req.body.how_many,
    arrivals:req.body.arrivals
});
newst.save();
// res.send("data is stored in the database");my 
res.redirect("/");

})
app.post("/storelogin",function(req,res){
const newst1=new Student1({
    // monument:req.body.monumentte,
    email:req.body.email,
    password:req.body.password,
    // arrivals:req.body.arrivals
});
newst1.save();
// res.send("data is stored in the database");my 
res.redirect("/");

})
app.listen(port,function(){
    console.log("the server is running in the port " + port);
})