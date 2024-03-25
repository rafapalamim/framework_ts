import { describe, expect, test } from '@jest/globals'
import EmailBody from './EmailBody'

class FooEmail implements EmailBody {

    constructor(private readonly data: {name: string}) {}

    getHtml(): string {
        let htmlTemplate = '<html><h1>Hello, {{name}}</h1></html>'
        htmlTemplate = htmlTemplate.replace('{{name}}', this.data.name)
        return htmlTemplate
    }

    getText(): string {
        let textTemplate = 'Hello, {{name}}'
        textTemplate = textTemplate.replace('{{name}}', this.data.name)
        return textTemplate
    }
}

describe('Email body unit test', () => {

    test('Should be able to create a email body', () => {
        const email: EmailBody = new FooEmail({name: 'John'})
        expect(email.getHtml()).toEqual('<html><h1>Hello, John</h1></html>')
        expect(email.getText()).toEqual('Hello, John')
    })    
})