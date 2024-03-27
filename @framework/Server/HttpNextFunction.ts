export default interface HttpNextFunction {
    call(err?: unknown): void
}