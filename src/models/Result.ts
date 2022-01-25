export class Result {
    public isSuccess: boolean;
    public isFailure: boolean;
    private readonly _value?: any;

    private constructor(isSuccess: boolean, value?: any){
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this._value = value;
        
        Object.freeze(this);
    }

    public getValue(): any{
        if(!this.isSuccess){
            throw new Error(`Cant retrive the value from a failed result.`);
        }
        return this._value;
    }

    public static success(value?: any): Result {
        return new Result(true, value);
    }

    public static failure(): Result {
        return new Result(false);
    }
}