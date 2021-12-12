import { OutputData } from "@editorjs/editorjs";

export type LoginDto = {
    email: string;
    password: string;
}

export type CreateUserDto = {
    fullName: string;
} & LoginDto;

export type ResponseUser = {
    createdAt: string;
    email: string;
    fullName: string;
    id: number;
    token: string;
    updatedAt: string;
}

export type PostItem = {
    title: string;
    body: OutputData['blocks'];
    description: string;
    id: number;
    views: number;
    user: ResponseUser;
    tags: null | string;
    text: null | string;
    createdAt: string;
    updatedAt: string;
}