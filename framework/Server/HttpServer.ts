export type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'

export default interface HttpServer {
    registerMiddleware(middlewareFunction: unknown): void
    addRoute(method: MethodType, url: string, callback: CallableFunction): void
    listen(port: number): void
}