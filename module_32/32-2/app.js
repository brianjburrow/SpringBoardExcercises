const express = require('express');
const res = require('express/lib/response');
const itemRoutes = require('./items')
const ExpressError = require("./expressError")
const app = express();

app.use(express.json());
app.use('/items', itemRoutes)

app.use((req, res, next)=>{
    return new ExpressError("Not Found", 404);
});

app.use((err, req, res, next)=>{
    res.status(err.status||500);
    return res.json({
        error: err.message,
    });
});

app.listen(3000, ()=>{
    console.log("listening on port 3000")
}) 


