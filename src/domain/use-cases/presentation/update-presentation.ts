import { PresentationRepository } from "../../interfaces/repositories/presentation-repository";
import { UpdatePresentationUseCase } from "../../interfaces/use-cases/update-presentation-use-case";
import { PresentationRequestModel } from "../../entities/presentation";

export class UpdatePresentation implements UpdatePresentationUseCase {
    presentationRepository:PresentationRepository;
    constructor(presentationRepository:PresentationRepository) {
        this.presentationRepository = presentationRepository;
    };


    async execute(id: String, data: PresentationRequestModel) {
        await this.presentationRepository.updatePresentation(id,data);
    }
    
}
