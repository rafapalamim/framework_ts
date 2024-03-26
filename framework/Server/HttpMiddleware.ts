export default interface HttpMiddleware<T> {
    getMiddlewareFunction() : T
}