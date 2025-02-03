import { PresentationRequestModel,uploadResults } from "../../entities/presentation";
import { PresentationRepository } from "../../interfaces/repositories/presentation-repository";
import { CreatePresentationUseCase } from "../../interfaces/use-cases/create-presentation-use-case";

export class CreatePresentation implements CreatePresentationUseCase {
    presentationRepository:PresentationRepository;
    constructor(presentationRepository:PresentationRepository) {
        this.presentationRepository = presentationRepository;
    };

    async execute(presentation: uploadResults) {
        try {
            const createPresentationObj = {
                path:presentation.files[0].path,
                name:presentation.body.name
            }
            await this.presentationRepository.createPresentation(createPresentationObj);
        } catch (error) {
            console.log("error:",error);
        }
       
    }
    
}