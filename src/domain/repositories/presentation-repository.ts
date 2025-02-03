import {
  PresentationRequestModel,
  Presentation,
  CreatePresentationObject,
} from "../entities/presentation";
import { PresentationRepository } from "../interfaces/repositories/presentation-repository";
import { PresentationDataSource } from "../../data/interfaces/data-sources/presentation-data-source";

export class PresentationRepositoryImpl implements PresentationRepository {
  presentationDataSource: PresentationDataSource<Presentation>;
  constructor(presentationDataSource: PresentationDataSource<Presentation>) {
    this.presentationDataSource = presentationDataSource;
  }

  async createPresentation(presentation: CreatePresentationObject) {
    try {
      await this.presentationDataSource.create(presentation);
    } catch (error) {
      console.log("error:", error);
    }
  }
  async deletePresentation(id: string) {
    await this.presentationDataSource.deleteOne(id);
  }
  async updatePresentation(id: string, data: Presentation) {
    await this.presentationDataSource.updateOne(id, data);
  }
  async getPresentations(): Promise<Presentation[] | void> {
    const results = await this.presentationDataSource.getAll();
    return results;
  }
  async getPresentation(id: string): Promise<Presentation | null> {
    const result = await this.presentationDataSource.getOne(id);
    return result;
  }
}
