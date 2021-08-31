//importing packages
const express =require('express');
const mongoose=require('mongoose');


//creation of express object
const app=express();


//applying middleware to convert unreadable data to object
app.use(express.json());


//creation and start of server
app.listen(8000,()=>{

    console.log("Server is running");
})


//connection of mongodb server
mongoose.connect("mongodb://localhost:27017/pokeapi",{useNewUrlParser:true},()=>{

        console.log("Mongo Server connected");
})


//creation of Schema for collection
const pokemonSchema=new mongoose.Schema({

    name: String,
    type: String,
    imageUrl: String

})


// connection of schema to collection & Model for Collection
const pokemonModel = new mongoose.model('pokemons',pokemonSchema);


//type of request
//url


//to get all pokemons
app.get("/pokemons",async (req, res)=>{

let pokemons=await pokemonModel.find();

        res.send(pokemons);

})




//fetch single pokemon
app.get("/pokemon/:id",async (req,res)=>{

    let id=req.params.id;

    let pokemon=await pokemonModel.find({_id:id});

    res.send(pokemon);
})


// to fetch a single pokemon based on type 

app.get("/pokemon/type/:type",async (req,res)=>{

    let type=req.params.type;
    let pokemon=await pokemonModel.find({type:type});
    res.send(pokemon);
})




//to create a new pokemon
app.post("/pokemon",(req,res)=>{

let pokemon=req.body;

let pokemonobj = new pokemonModel(pokemon);

pokemonobj.save((err,data)=>{

    if(err===null){

        res.send({message : "Pokemon created"})
    }
});

})




//delete a pokemon
app.delete("/pokemon/:id",(req,res)=>{

    let id=req.params.id;

    pokemonModel.deleteOne({_id:id},(err,data)=>{

        if(err===null){
            res.send({message:"Deleted Pokemon"});
        }
    })

})




//update pokemon
app.put("/pokemon/:id",(req,res)=>{

    let id=req.params.id;
    let pokemon=req.body;

    pokemonModel.updateOne({_id:id},pokemon,(err,data)=>{

        if(err===null)
        {
            res.send("Pokemon Updated");
        }
            
    })

})



