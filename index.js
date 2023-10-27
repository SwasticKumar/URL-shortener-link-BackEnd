console.log("URL Shortener");
import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./Routes/users.js";
import { urlRouter } from "./Routes/urls.js";
import { isAuthenticated } from "./Authentication/userAuth.js";
import { getURL } from './Controllers/urls.js';

dotenv.config();
const PORT = process.env.PORT;
const app = express(); 

//application middleware 
app.use(express.json());
app.use(cors());

//user is the base route 
app.use("/user", userRouter);
app.use("/url", isAuthenticated, urlRouter);

app.get("/", (req,res)=> {
   res.send({msg:"connection working - URL shortener app"});
})

// To get URL redirection from short URL 
app.get('/:urlID', async(req, res)=>{
   try{
       const url = await getURL({urlID: req.params.urlID})
       if(url){
           console.log("redirecting");
           return res.status(200).json({longURL:url.longURL})
         //return res.redirect(url.longURL)
       }
       else{
           return res.status(404).json({message: 'No URL Found'})
       }
   }
   catch(err){
       console.error(err)
       res.status(500).json('Server Error')
   }
 })
 
app.listen(PORT,()=>console.log(`Server started at localhost:${PORT}`))