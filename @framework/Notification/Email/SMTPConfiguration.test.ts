import { describe, test, expect } from '@jest/globals'
import SMTPConfiguration from './SMTPConfiguration'

describe('SMTP Configuration unit test', () => {

    test('Should return a correctly configuration', () => {

        const input = {
            configurationAlias: 'localhost_test',
            host: 'host-mail',
            port: 587,
            user: 'user',
            password: 'password',
            tls: false,
            sender: { name: 'John doe', email: 'johndoe@company.com' },
            replyTo: { name: 'no-reply', email: 'noreply@company.com' }
        }

        const config = new SMTPConfiguration(input.configurationAlias, input.host, input.user, input.password, input.port, input.tls, input.sender, input.replyTo)

        expect(config).toEqual(input)

    })

    test('Should return a correctly configuration without reply to', () => {

        const input = {
            configurationAlias: 'localhost_test',
            host: 'host-mail',
            port: 587,
            user: 'user',
            password: 'password',
            tls: false,
            sender: { name: 'John doe', email: 'johndoe@company.com' }
        }

        const config = new SMTPConfiguration(input.configurationAlias, input.host, input.user, input.password, input.port, input.tls, input.sender)

        expect(config).toEqual({ ...input, replyTo: null })

    })

})