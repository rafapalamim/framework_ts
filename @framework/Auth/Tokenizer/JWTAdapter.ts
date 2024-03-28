import TokenHandler from './TokenHandler'
import jwt from 'jsonwebtoken'

export type JWTType = {
    format: string,
    token: string
}

export default class JWTAdapter implements TokenHandler<string> {

    generate(payload: object): string {
        return jwt.sign(payload, 'secret-key', { noTimestamp: true })
    }

    verify(plainToken: string): string {
        return JSON.stringify(jwt.verify(plainToken, 'secret-key'))
    }
}