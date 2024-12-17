import express from "express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

const server = express();

dotenv.config();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

export default server;