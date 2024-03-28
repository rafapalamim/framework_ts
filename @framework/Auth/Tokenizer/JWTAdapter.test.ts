import { describe, expect, test } from '@jest/globals'
import JWTAdapter from './JWTAdapter'
import TokenHandler from './TokenHandler'

describe('JWTAdapter unit test', () => {

    test('Should be able to generate and validate a jwt token', () => {

        const payload = {
            id: 1,
            name: 'name',
            email: 'email'
        }

        const adapter: TokenHandler<string> = new JWTAdapter()

        const signedToken = adapter.generate(payload)

        expect(signedToken).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Im5hbWUiLCJlbWFpbCI6ImVtYWlsIn0.nPupBrxPqXIS-q4xk9B4b7hKWdUy44_re8std8Dqz8Q')

        const verifyToken = adapter.verify(signedToken)

        expect(verifyToken).toBe(JSON.stringify(payload))
    })

})