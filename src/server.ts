import express from "express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

const server = express();

dotenv.config();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

export default server;