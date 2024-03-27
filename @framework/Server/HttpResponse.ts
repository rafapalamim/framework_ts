export default interface HttpResponse {
    setHeader(key: string, value: string): this
    setStatusCode(code: number): this
    send(data: unknown): void
    json(json: object): void
    get statusCode(): number
}