import { ResponseModel } from "./responseModel";

export interface LİstResponceModel<T> extends ResponseModel{
    data:T[]
}