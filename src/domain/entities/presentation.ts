export interface Presentation {
    id:number;
    name:string;
}

export interface PresentationRequestModel {
    name:string;
}

export interface filesInterface {
    fieldname:string,
    originalname:string,
    encoding:string,
    mimetype:string,
    destination:string,
    filename:string,
    path:string,
    size:number
}

export interface uploadResults {
    files:filesInterface[],
    body:any
}

export interface CreatePresentationObject {
    path:string,
    name:string
}