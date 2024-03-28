import Controller from '../../Controller/Controller'
import AuthenticationError from '../../../@framework/Error/AuthenticationError'
import HttpNextFunction from '../../Server/HttpNextFunction'
import HttpRequest from '../../Server/HttpRequest'
import HttpResponse from '../../Server/HttpResponse'
import HttpServer from '../../Server/HttpServer'
import { AuthenticationUserFields } from '../@Config/AuthenticationUserFields'
import AuthRepository from './AuthRepository'

export default class AuthController implements Controller {

    constructor(private readonly authRepository: AuthRepository) { }

    register(server: HttpServer): void {
        server.registerRoute('post', '/auth', async (req: HttpRequest<AuthenticationUserFields, null>, res: HttpResponse, next: HttpNextFunction) => {

            const { username, password } = req.body
            const result = await this.authRepository.makeLogin({ username, password })

            if(!result) throw new AuthenticationError('User not found')

            res.setStatusCode(200).json({
                token: 'jwt_12345'
            })

            next.call()
        })
    }

}