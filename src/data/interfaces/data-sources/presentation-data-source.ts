import { Presentation,PresentationRequestModel,CreatePresentationObject } from "../../../domain/entities/presentation";

export interface PresentationDataSource<T> {
    create(presentation:any):Promise<void>;
    getAll():Promise<T[] | void>;
    deleteOne(id:String):void;
    updateOne(id:String,data:any):void;
    getOne(id:String):Promise<T | null>;
}