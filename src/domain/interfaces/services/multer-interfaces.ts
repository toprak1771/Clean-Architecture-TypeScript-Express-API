import multer from "multer";
import { Request,Response } from "express";

export interface MulterInterfaces {
    fsCreateModule(filePath:string):void;
    storageFile(subPath:string):multer.StorageEngine;
    uploadFiles(subPath:string):void;
    handleArrayUploadFile(req:Request,res:Response,subPath:string):Promise<any>;
}