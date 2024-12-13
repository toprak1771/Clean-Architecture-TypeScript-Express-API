import { PresentationRequestModel } from "../../entities/presentation";
import { PresentationRepository } from "../../interfaces/repositories/presentation-repository";
import { CreatePresentationUseCase } from "../../interfaces/use-cases/create-presentation-use-case";

export class CreatePresentation implements CreatePresentationUseCase {
    presentationRepository:PresentationRepository;
    constructor(presentationRepository:PresentationRepository) {
        this.presentationRepository = presentationRepository;
    };

    async execute(presentation: PresentationRequestModel) {
        await this.presentationRepository.createPresentation(presentation);
    }
    
}