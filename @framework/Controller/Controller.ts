import HttpServer from '../Server/HttpServer'

export default interface Controller {
    register(server: HttpServer) : void
}