import {PORT, mongoDBURL} from "./config.js";
import { PostIt } from "./models/postItModel.js";
import cors from "cors";
import mongoose from "mongoose";
import express, { response } from "express";
run() 
async function run() {
    try {
       const dados = await PostIt.find({});
       console.log(dados);
    } catch(e) {
        console.log(e.message)
    }
}