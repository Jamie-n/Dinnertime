// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.set("views", [path.join(__dirname,"views"), path.join(__dirname,'views/booking')]);
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
    extended:true
}))

/**
 * Routes Definitions
 */

app.get("/", (req,res)=>{
    res.render('index', {title: "Home"})
});

app.get("/book", (req ,res)=>{
    res.render('booking', {title: "Book a Table"})
});

app.post("/book", (req,res)=>{
   console.log(req.body.bookingName + req.body.date);
   res.redirect('/bookingComplete?ref='+req.body.bookingName)
   res.end()
});

app.get("/bookingComplete", (req ,res)=>{
    console.log();
    res.render('bookingComplete', {title: "Booking Confirmed", bookingRef: req.query.ref})
});

/**
 * Server Activation
 */

app.listen(port, ()=>{
    console.log(`Listening to requests on http://localhost:${port}`);
})