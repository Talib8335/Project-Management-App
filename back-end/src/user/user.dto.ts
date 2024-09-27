import mongoose, { Document } from "mongoose";

export interface SignupDto {
    readonly fullname: string;
    readonly email: string;
    readonly password: string;
}

export interface LoginDto {
    readonly email: string;
    readonly password: string;
}

export interface UserSchemaDto extends Document {
    readonly fullname: string;
    readonly email: string;
    password: string;
    members: [mongoose.Types.ObjectId]
}

export interface GetTokenDto {
    _id: string;
    fullname: string;
    email: string;
    password: undefined
}

export interface ForgotRequestDto {
    email: string;
}

export interface ForgotPayload {
    id: string;
    iat: number;
    exp: number;
}