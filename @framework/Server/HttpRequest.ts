export default interface HttpRequest<R, Q> {
    get method(): string
    get path(): string
    get body(): R
    get query(): Q
    get currentUser(): unknown
    get startTime(): number
    addStartTime(): void
}