import { describe, test, expect } from '@jest/globals'
import EmailTitle from './EmailTitle'

describe('Email title unit test', () => {

    test('Should be able to create a title with valid value', () => {
        const title = new EmailTitle('Hi, i\'m an email title')
        expect(title.title).toBe('Hi, i\'m an email title')
    })

    test('Should not be able to create a title with invalid length value', () => {
        expect(() => new EmailTitle('')).toThrowError('An email title must be greater than 0 (zero) and less than 70 characters length')
        expect(() => new EmailTitle('                                                                                       ')).toThrowError('An email title must be greater than 0 (zero) and less than 70 characters length')
        expect(() => new EmailTitle('12345678901234567890123456789012345678901234567890123456789012345678900')).toThrowError('An email title must be greater than 0 (zero) and less than 70 characters length')
    })

    test('Should not be able to create a title with invalid chars value', () => {
        expect(() => new EmailTitle('Hello i\'m wrong ¬ £ ¢ title')).toThrowError('There are special characters in the email title. Please review the email title.')
    })

})