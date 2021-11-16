const express = require("express");

const Router = express.Router();

const { users } = require("../placeholder-data");


const {addUserSchema,
     editUserInfoSchema ,
     editUserPasswordSchema }= require("../validators/users")

Router.get("/", (req, res) => {
    res.json(users);
});
Router.get("/address", (req, res) => {
    res.json(users);
});

Router.get("/:userId",(req,res) => {
    const userId = parseInt(req.params.userId, 10);

    const user = users.filter(({id}) => id === userId );
     if(user.length){
         res.json(user[0]);
     }
     else{
         res.json({error : "no matching user found"});
     }

} );

// delete router

Router.delete("/:userId", (req,res) => {

    const userId = parseInt(req.params.userId, 10);

    const user = users.filter(({id}) => id === userId);

    if(user.length){
        users.splice(user[0].id,1);
        res.json(`sucessfully deleted the user ${user}`)
    }
    else{
        res.json({error: " no matching found"
        });
    }
});

//update route need some more work 

// Router.put("/:usersId", (req,res) =>{
//     try{
//        const userId = parseInt(req.params.userId,10);

//        const userBody = req.body;

//        const {value: passwordEntry, error}= editUserPasswordSchema.validate(userBody);
       
//        if(error){
//         throw error;
//     }

//     const userPassword = users.filter(({ id }) => id === userId);
      
//      const updatedPassword = {
//          ...userPassword[0],
//          ...passwordEntry,
//      }
//      if(userPassword.length){
//          users.splice(userPassword[0].id,1 ,updatedPassword);
//          res.json("Successfully updated the password");
//      }
//         else { throw new Errow("no matching entry found");
//     }
    
//     }
//     catch (error) {
//         console.log(error);
//         res.json(error.details);
//       }
//     });


//update Info Router

Router.put("/:userId",(req,res) => {
    try{
    const userId = parseInt(req.params.userId,10);
     
    const user = req.body;

    const { value:infoEntry , error}= editUserInfoSchema.validate(user);
    if(error){
        throw error;
    }

    const userInfo = users.filter(({ id }) => id === userId);

    const updatedInfo = {

        ...userInfo[0],
        ...infoEntry,
    };
    if(userInfo.length){
        users.splice(userInfo[0].id,1,updatedInfo);
        res.json("Successfully updated the info");
    }
    else{
        throw new Errow("no matching entry found");
    }
    
    }
    catch (error) {
        console.log(error);
        res.json(error.details);
      }
    });

    //post router to add users
    
    Router.post("/", (req, res) => {
        try {
          const userPost = req.body;
      
          const { value: userEntry, error } = addUserSchema.validate(userPost);
      
          if (error.length) {
            throw error;
          }
      
         
          users.push(userEntry);
      
          res.json(users);
        } catch (error) {
          console.log(error);
          res.json(error.details);
        }
      });

      
module.exports = Router;
