export default interface HttpError {
    get message() : string
    get stack(): string | undefined
    get errorCode(): number
    get type(): string
    isBaseErrorInstance(): boolean
}