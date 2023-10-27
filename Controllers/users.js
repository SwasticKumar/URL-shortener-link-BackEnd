import {client} from "../db.js";
import { ObjectId } from "bson"; 
import jwt from "jsonwebtoken";

export function addUser(data){
    return client
    .db("URLuserData")
    .collection("users")
    .insertOne(data)
}

export function getUser(data){
    return client
    .db("URLuserData")
    .collection("users")
    .findOne(data)
} 

export function getUserByID(id){
    return client
    .db("URLuserData")
    .collection("users")
    .findOne({_id: new ObjectId(id)})
} 

export function resetPassword(id, data){
    return client
    .db("URLuserData")
    .collection("users")
    .findOneAndUpdate({_id: new ObjectId(id)}, {$set:data})
}

export function activationMail(email, data){
    return client
    .db("URLuserData")
    .collection("users")
    .findOneAndUpdate({email:email}, {$set:data})
}

export function forgotPassword(email, data){
    return client
    .db("URLuserData")
    .collection("users")
    .findOneAndUpdate({email:email}, {$set:data})
}

export function activateAccount(email, data){
    return client
    .db("URLuserData")
    .collection("users")
    .findOneAndUpdate({email:email}, {$set:data})
}

export function generateToken(id,secret){
    return jwt.sign(
        {id},
        secret,
        {expiresIn:"10m"}
    )
}

export function generateActivationToken(id,secret){
    return jwt.sign(
        {id},
        secret,
        {expiresIn:"2d"}
    )
}

export function generateUserToken(id,secret){
    return jwt.sign(
        {id},
        secret,
        {expiresIn:"1d"}
    )
}