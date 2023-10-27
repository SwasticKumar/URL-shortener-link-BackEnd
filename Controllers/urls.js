import {client} from "../db.js";
import { ObjectId } from "bson"; 
import jwt from "jsonwebtoken";

export function addURL(data){
    return client
    .db("URLData")
    .collection("url")
    .insertOne(data)
}
export function getURL(data){
    return client
    .db("URLData")
    .collection("url")
    .findOne(data)
} 
export function getAllURL(email){
    return client
    .db("URLData")
    .collection("url")
    .find({user: email})
    .toArray()
} 
export function urlDayCount(email,today){
    return client
    .db("URLData")
    .collection("url")
    .find({user: email, createdOn:{$eq: today} })
    .toArray()
} 
export function urlMonthCount(email,date){
    return client
    .db("URLData")
    .collection("url")
    .find({user: email, createdOn:{$gte:date}})
    .toArray()
} 
export function updateCount(id){
    return client
    .db("URLData")
    .collection("url")
    .findOneAndUpdate({urlID:id}, {$inc:{"clicked":1}}, {returnDocument:"after"})
} 