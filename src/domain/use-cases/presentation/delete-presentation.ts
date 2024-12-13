import { PresentationRepository } from "../../interfaces/repositories/presentation-repository";
import { DeletePresentationUseCase } from "../../interfaces/use-cases/delete-presentation-use-case";

export class DeletePresentation implements DeletePresentationUseCase {
    presentationRepository:PresentationRepository;
    constructor(presentationRepository:PresentationRepository) {
        this.presentationRepository = presentationRepository;
    }

    async execute(id: String) {
        await this.presentationRepository.deletePresentation(id)
    }
    
}