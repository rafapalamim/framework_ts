export default abstract class BaseError extends Error {

    readonly errorCode: number
    
    constructor(message: string, errorCode?: number){
        super(message)
        this.errorCode = errorCode ?? 500
    }
}