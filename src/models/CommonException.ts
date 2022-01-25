import { HttpException } from "@nestjs/common";

export default class CommonException extends HttpException{
    errorCode = 10000;
    errorMessage = '';

    constructor(errorCode: number, errorMessage?: string){
        super('Something Went Wrong', 460);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
