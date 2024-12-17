import express from "express";
import { Request,Response } from "express";
import { CreatePresentationUseCase } from "../../domain/interfaces/use-cases/create-presentation-use-case";
import { GetAllPresentationsUseCase } from "../../domain/interfaces/use-cases/get-all-presentations-use-case";

export default function PresentationRouter(getAllPresentationUseCase:GetAllPresentationsUseCase,createPresentationUseCase:CreatePresentationUseCase){
    const router = express.Router();

    router.get('/',async (req:Request,res:Response) => {
        try {
            const contacts = await getAllPresentationUseCase.execute();
            res.send(contacts);
        } catch (error) {
            res.status(500).send({message:'Error fetching data.'})
        }
    })

    router.post('/',async (req:Request,res:Response) => {
        try {
            console.log("geldii")
            console.log("req.body:",req.body);
            await createPresentationUseCase.execute(req.body);
            res.statusCode = 201;
            res.json({message:"Created"});
        } catch (error:any) {
            console.log("error:",error.message)
            res.status(500).send({message:"Error saving data"})
        }
    })

    return router;
}