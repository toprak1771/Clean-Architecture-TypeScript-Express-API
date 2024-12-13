import { Presentation } from "../../entities/presentation";
import { PresentationRepository } from "../../interfaces/repositories/presentation-repository";
import { GetOnePresentationUseCase } from "../../interfaces/use-cases/get-one-presentation-use-case";

export class GetOnePresentation implements GetOnePresentationUseCase {
    presentationRepository:PresentationRepository;
    constructor(presentationRepository:PresentationRepository) {
        this.presentationRepository = presentationRepository;
    };

    async execute(id: String): Promise<Presentation | null> {
        const result = await this.presentationRepository.getPresentation(id);
        return result;
    }
    
}