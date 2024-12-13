import { Presentation,PresentationRequestModel } from "../../../domain/entities/presentation";

export interface PresentationDataSource {
    create(presentation:PresentationRequestModel):void;
    getAll():Promise<Presentation[]>;
    deleteOne(id:String):void;
    updateOne(id:String,data:Presentation):void;
    getOne(id:String):Promise<Presentation | null>;
}