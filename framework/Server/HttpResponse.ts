export default interface HttpResponse {
    status(code: number): this
    send(data: unknown): void
    json(json: object): void
}