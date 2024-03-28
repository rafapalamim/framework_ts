import { describe, test, expect } from '@jest/globals'
import Authenticatable from './Authenticatable'
import AuthenticationRepository from '../../Persistence/Repository/AuthenticationRepository'
import { CurrentUserFields } from '../../AuthModule/@Config/CurrentUserFields'
import AuthenticationError from '../../Error/AuthenticationError'

type MockAuthenticationUserFields = {
    email: string,
    password: string
}

class MockAuthentication extends Authenticatable<MockAuthenticationUserFields> {

    async login(data: MockAuthenticationUserFields): Promise<CurrentUserFields> {
        const result = await this.authRepository.makeLogin(data)

        if(!result) throw new Error('User not found')

        return result
    }
}

class MockAuthRepository implements AuthenticationRepository<MockAuthenticationUserFields>{

    async makeLogin(data: MockAuthenticationUserFields): Promise<CurrentUserFields> {

        if (data.email === 'johndoe@mail.com' && data.password === '12345678') {
            return {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@mail.com'
            }
        }

        throw new AuthenticationError('User not found')
    }
}

describe('Authenticatable unit test', () => {

    test('Should be able to make user auth', async () => {

        const auth = new MockAuthentication(new MockAuthRepository())
        const userData = await auth.login({ email: 'johndoe@mail.com', password: '12345678' })

        expect(userData.id).toBe(1)
        expect(userData.name).toBe('John Doe')
        expect(userData.email).toBe('johndoe@mail.com')

    })

    test('Should not be able to make user auth with invalid credentials', () => {

        const auth = new MockAuthentication(new MockAuthRepository())
        expect(async () => await auth.login({ email: 'invalid_email', password: 'invalid_password' })).rejects.toThrowError('User not found')

    })

})