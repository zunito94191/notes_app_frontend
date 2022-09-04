import { User } from "./common/types";
export interface Notes{
    id:string;
    title:string;
    body:string;
    editorLink:string;
    visitorLink:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface UserNotes{
    name:string;
    email:string;
    photo:string;
    createdAt:Date;
    updatedAt:Date;
    notes:Notes[]
}