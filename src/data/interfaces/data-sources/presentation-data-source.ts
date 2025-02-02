import { Presentation,PresentationRequestModel,CreatePresentationObject } from "../../../domain/entities/presentation";

export interface PresentationDataSource {
    create(presentation:CreatePresentationObject):Promise<void>;
    getAll():Promise<Presentation[] | void>;
    deleteOne(id:String):void;
    updateOne(id:String,data:Presentation):void;
    getOne(id:String):Promise<Presentation | null>;
}