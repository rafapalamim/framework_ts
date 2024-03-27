export type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'

export default interface HttpServer {
    registerMiddleware(middlewareFunction: unknown): void
    registerRoute(method: MethodType, url: string, callback: CallableFunction): void
    listen(port: number): void
}