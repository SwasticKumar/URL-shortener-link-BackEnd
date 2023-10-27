import express from "express";
import { addURL, getURL, getAllURL, urlDayCount, urlMonthCount, updateCount } from "../Controllers/urls.js";


const router = express.Router();  

router.post("/createURL", async (req,res) => { 
          try{
          function generateShortId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
      }

      const id = generateShortId(7); // Generate a custom short ID
      console.log('Generated ID:', id);
            // const url = await getURL({ urlID: id });
            // console.log(url)
            // if(!url){
            //   return res.status(404).json({message:"Try again"})
            // }
            const shortURL = '/' + id;
          
     
      const data = {...req.body, shortURL:shortURL, urlID:id, clicked:0}
      const result = await addURL(data) 
      if(!result.acknowledged){
        return res.status(404).json({message:"Error uploading user information"})
      }
      res.status(200).json({result:result, data:data})
    }
    catch(err){
      console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
  })

  //get all URL for an user
  router.post("/all", async (req,res) => {
    try{
      console.log("get all url"); 
      // console.log(req.body);
      if(!req.body.email){
        return res.status(400).json({message:"User not found"});
      }
      const urlList = await getAllURL(req.body.email);
      
      if(!urlList){
        return res.status(404).json({message:"No data found"})
      }
      res.status(200).json({data:urlList})
  
    }
    catch(err){
      console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
  })

  //get today URL and count
  router.post("/today", async (req,res) => {
    console.log("get all url today"); 
      // console.log(req.body);
      if(!req.body.email){
        return res.status(400).json({message:"User not found"});
      }
    try{
      const urlList = await urlDayCount(req.body.email, req.body.today);
      
      if(!urlList){
        return res.status(404).json({message:"No data found"})
      }
      res.status(200).json({data:urlList})
  
    }
    catch(err){
      console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
  })

  //get current month URL and count
  router.post("/monthly", async (req,res) => {
    console.log("get all url this month"); 
      // console.log(req.body);
    try{
      const urlList = await urlMonthCount(req.body.email, req.body.date);
      
      if(!urlList){
        return res.status(404).json({message:"No data found"})
      }
      res.status(200).json({data:urlList})
  
    }
    catch(err){
      console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
  })

  //update no of clicks for an URL
  router.post("/clickcount", async (req,res) => {
    console.log("update click count"); 
      // console.log(req.body);
    try{
      const updatedURL = await updateCount(req.body.id);
      
      if(!updatedURL){
        return res.status(404).json({message:"No data found"})
      }
      res.status(200).json({data:updatedURL})
  
    }
    catch(err){
      console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
  })

export const urlRouter = router;