import express from "express";
import { Request, Response } from "express";
import { CreatePresentationUseCase } from "../../domain/interfaces/use-cases/create-presentation-use-case";
import { GetAllPresentationsUseCase } from "../../domain/interfaces/use-cases/get-all-presentations-use-case";
import { MulterInterfaces } from "../../domain/interfaces/services/multer-interfaces";

export default function PresentationRouter(
  getAllPresentationUseCase: GetAllPresentationsUseCase,
  createPresentationUseCase: CreatePresentationUseCase,
  multerInterfaces: MulterInterfaces
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const contacts = await getAllPresentationUseCase.execute();
      res.send(contacts);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data." });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const uploadResults = await multerInterfaces.handleArrayUploadFile(
        req,
        res,
        "thumb"
      );

      await createPresentationUseCase.execute(uploadResults);
      res.statusCode = 201;
      res.json({ message: "Created" });
    } catch (error: any) {
      console.log("error:", error.message);
      res.status(500).send({ message: "Error saving data" });
    }
  });

  return router;
}
