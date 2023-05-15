const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const signupModel = require("./models/signupModel");
const picModel = require('./models/picMode');
const port = 4000;
const app = express();
app.use(express.json());
const secretKey = "aryanpanchal";
app.use(cors());

const db = 
  "mongodb+srv://amanpanchal:amanpanchal@cluster0.u0kyvjj.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db)
  .then(() => {
    console.log("The database is connnected");
  })
  .catch((e) => {
    console.log("The error in database connection is ", e);
  });
  


  app.post('/getallpic',async(req,res) => {
    try {
      const{ id} =req.body
      
      console.log(id);
      const data = await picModel.find({id }).then((resp) =>{
        res.json({res : resp});
        console.log(resp);

      })
     

      
    }catch(e) {
      console.log("The errro in getting is  uploding is : ",e);
    }
  })
  app.put("/save/:id",async(req,res) => {
    try {
      const a = await picModel.findById(req.params.id);
      const picUpdate = await picModel.findOneAndUpdate(
        {_id : req.params.id},
        {views : a.views + 1}
        )
await picUpdate.save();
return res.json({
  picUpdate
})
    }
catch(e){
  console.log("there is error in change request is ",e);

}

  })


  app.post('/pic',async(req,res) => {
    try {


      const {pic, title ,id} = req.body;
      console.log(pic, title,id)
      await picModel.create({
        title,pic,id
      }).then((resp) => {
        res.json({
          msg : "Pic is uploaded successfully",resp
        })

      }).catch((e) =>{
        console.log("hte error i s",e);
        res.json({
          msg : "There is error in uplaod msg"
        })
      })
    }catch(e) {
      console.log("The errro in file uploding is : ",e);
    }
  })

app.get("/", (req, res) => {
  res.send("App is running well");
});
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await signupModel.find({ email });
    if (userExists.length > 0) {
   res.json({
        error: "User Already Exists",
      });
    }
   else {
    const user = {
        name: name,
        email: email,
        password: password,
      };
      const token = jwt.sign(user, secretKey, {
        expiresIn: "30d",
      });
      console.log(token);
      await signupModel
        .create({
          name: name,
          email: email,
          password: password,
        })
        .then((resp) => {
          res.json({
            msg: "User Created successfully",
            token, resp
          });
        })
        .catch((e) => {
          console.log("The error in this is ", e);
        });
   }
  } catch (e) {
    console.log("The error in this is ", e);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    const resp = await signupModel.find({ email,password });


    if (resp.length>0) {
      const token = jwt.sign({resp}, secretKey, {
        expiresIn: "30d",
      });
      res.json({
        msg: "Login is successfully",
        token,
        resp

      });
    } else {
      res.json({
        error: "Invalid email or password",
      });
    }
  } catch (e) {
    console.log("The error in login is ", e);
  }
});
app.get('/allpic',async(req,res)=> {
  const data  = await picModel.find();
  res.send(data);

})

app.listen(port, () => {
  console.log(`The port is running at the port ${port}`);
});