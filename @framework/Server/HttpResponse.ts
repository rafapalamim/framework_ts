export default interface HttpResponse {
    set(key: string, value: string): this
    status(code: number): this
    send(data: unknown): void
    json(json: object): void
    end(data: unknown) : void
}