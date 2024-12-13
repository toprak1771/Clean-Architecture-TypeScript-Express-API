import { PresentationRequestModel, Presentation } from "../entities/presentation";
import { PresentationRepository } from "../interfaces/repositories/presentation-repository";
import { PresentationDataSource } from "../../data/interfaces/data-sources/presentation-data-source";

export class PresentationRepositoryImpl implements PresentationRepository {
    presentationDataSource:PresentationDataSource
    constructor(presentationDataSource:PresentationDataSource) {
        this.presentationDataSource = presentationDataSource
    }

    async createPresentation(presentation: PresentationRequestModel) {
        await this.presentationDataSource.create(presentation);
    }
    async deletePresentation(id: string) {
        await this.presentationDataSource.deleteOne(id);
    }
    async updatePresentation(id: string, data: Presentation) {
        await this.presentationDataSource.updateOne(id,data);
    }
    async getPresentations(): Promise<Presentation[]> {
        const results = await this.presentationDataSource.getAll();
        return results;
    }
    async getPresentation(id: string): Promise<Presentation | null> {
        const result = await this.presentationDataSource.getOne(id);
        return result;
    }
    
}