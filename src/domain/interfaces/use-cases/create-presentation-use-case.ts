import { uploadResults } from "../../entities/presentation";

export interface CreatePresentationUseCase {
    execute(presentation:uploadResults):void;
}