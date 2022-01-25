import { BaseResponse } from "./BaseResponse";

export class ErrorResponse extends BaseResponse {
    private path = '';
    private timestamp = '';
    private errorCode = 0;
    private rawErrors: any[] = [];

    constructor(statusCode: number,errorCode: number,message: string, path: string, timestamp: any) {
        super()
        this.status = 'error';
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
        this.path = path;
        this.timestamp = timestamp;
        console.log({status: 'error', statusCode: this.statusCode,errorCode: this.errorCode, message: this.message, rawErrors: this.rawErrors, path: this.path})
    }

}