const express = require("express");

const Router = express.Router();


const { dishes } = require("../placeholder-data");

Router.get("/", (req,res) => {
    res.json(dishes);
});

Router.get("/:dishId", (req,res) => {
    const dishId = parseInt(req.params.dishId, 10);
    const  dish = dishes.filter(({ id }) => id == dishId)

    if(dish.length){
        res.json(dish[0]);
    }
    else{
        res.json({error: "no matching dish found"});
    }
});


Router.get("*", (req,res) => {
    res.send("error ")
});

module.exports = Router;
