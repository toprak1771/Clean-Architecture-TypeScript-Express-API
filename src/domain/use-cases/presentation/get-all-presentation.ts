import { Presentation } from "../../entities/presentation";
import { PresentationRepository } from "../../interfaces/repositories/presentation-repository";
import { GetAllPresentationsUseCase } from "../../interfaces/use-cases/get-all-presentations-use-case";

export class GetAllPresentation implements GetAllPresentationsUseCase {
    presentationRepository:PresentationRepository;
    constructor(presentationRepository:PresentationRepository) {
        this.presentationRepository = presentationRepository;
    };

    async execute(): Promise<Presentation[] | void> {
        const result = await this.presentationRepository.getPresentations();
        return result;
    }
    
}