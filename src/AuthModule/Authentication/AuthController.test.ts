import { describe, expect, test } from '@jest/globals'
import HttpServer, { MethodType } from '../../Server/HttpServer'
import AuthController from './AuthController'
import AuthRepository from './AuthRepository'
import { AuthenticationUserFields } from '../@Config/AuthenticationUserFields'
import { CurrentUserFields } from '../@Config/CurrentUserFields'
import HttpRequest from '../../Server/HttpRequest'
import HttpNextFunction from '../../Server/HttpNextFunction'
import HttpResponse from '../../Server/HttpResponse'

class MockHttpServer implements HttpServer {

    function: CallableFunction | null = null

    registerMiddleware(): void {
        throw new Error('Method not implemented.')
    }

    registerErrorMiddleware(): void {
        throw new Error('Method not implemented.')
    }

    registerRoute(method: MethodType, url: string, callback: CallableFunction): void {
        this.function = callback
    }

    listen(): void {
        throw new Error('Method not implemented.')
    }

}

class MockAuthRepository implements AuthRepository {

    async makeLogin(data: AuthenticationUserFields): Promise<CurrentUserFields | null> {

        if (data.username === 'admin' && data.password === 'admin') {
            return {
                id: '1',
                name: 'admin',
                email: 'email@mail.com'
            }
        }

        return null
    }

}

let MockResponseCode: number | null = null
let MockResponseBody: object | null = null

const MockResponse: HttpResponse = {

    setHeader: function (key: string, value: string): HttpResponse { // eslint-disable-line
        return this
    },
    setStatusCode: function (code: number): HttpResponse {
        MockResponseCode = code
        return this
    },
    send: function (data: unknown): void { // eslint-disable-line

    },
    json: function (json: object): void {
        MockResponseBody = json
    },
    statusCode: 0
}

const MockRequest: HttpRequest<AuthenticationUserFields, null> = {
    method: '',
    path: '',
    body: {
        username: '',
        password: ''
    },
    query: null,
    requestedUrl: '',
    route: null,
    currentUser: undefined,
    startTime: 0,
    addStartTime: function (): void {

    }
}

const MockNextFunction: HttpNextFunction = {
    call: function (): void { }
}

describe('AuthController unit test', () => {

    test('Should be able', async () => {

        const mockServer = new MockHttpServer()
        const mockRepository = new MockAuthRepository()
        const controller = new AuthController(mockRepository)
        controller.register(mockServer)

        MockRequest.body.username = 'admin'
        MockRequest.body.password = 'admin'

        await mockServer.function!(MockRequest, MockResponse, MockNextFunction)

        expect(MockResponseCode).toBe(200)
        expect(MockResponseBody).toEqual({
            token: 'jwt_12345'
        })
    })
})