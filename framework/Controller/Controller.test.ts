import { describe, expect, jest, test } from '@jest/globals'
import Controller from './Controller'
import HttpServer from '../Server/HttpServer'

class FooServer implements HttpServer {

    private controllers: {
        ['get']: { endpoint: string, function: CallableFunction }[],
        ['post']: { endpoint: string, function: CallableFunction }[],
        ['put']: { endpoint: string, function: CallableFunction }[],
        ['patch']: { endpoint: string, function: CallableFunction }[],
        ['delete']: { endpoint: string, function: CallableFunction }[],
        ['options']: { endpoint: string, function: CallableFunction }[]
    } = {
            'get': [],
            'post': [],
            'put': [],
            'patch': [],
            'delete': [],
            'options': [],
        }

    addRoute(method: string, url: string, callback: CallableFunction): void {
        this.controllers[method as 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'].push({ endpoint: url, function: callback })
    }

    listen(port: number): void { // eslint-disable-line
        if(port === 1) return this.controllers['get'][0].function()
    }

}

class FooController implements Controller {

    register(server: HttpServer): void {
        server.addRoute('get', '/jest', () => {
            return 'hello, jest'
        })
    }

}

describe('Controller unit test', () => {

    test('Should be able to register a route with controller', () => {

        const server = new FooServer()
        const controller = new FooController()

        const spyRegister = jest.spyOn(controller, 'register')
        controller.register(server)

        expect(spyRegister).toHaveBeenCalled()

    })

    test('Should be able to register a route with controller and execute controller when listen on port 1', () => {

        const server = new FooServer()
        const controller = new FooController()

        controller.register(server)
        expect(server.listen(1)).toBe('hello, jest')

    })

})