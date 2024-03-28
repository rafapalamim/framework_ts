import { describe, test, expect } from '@jest/globals'
import Module from './Module'
import Action from './Action'

describe('Authorization Module unit test', () => {

    test('Should be able to create a new module', () => {

        const action = new Action(1,'action1')
        const module = new Module(1, 'module1', [action])

        expect(module.id).toBe(1)
        expect(module.slug).toBe('module1')
        expect(module.hasAction('action1')).toBeTruthy()

    })

    test('Should be able to create a new module with empty actions', () => {

        const module = new Module('1', 'module1', [])

        expect(module.id).toBe('1')
        expect(module.slug).toBe('module1')
        expect(module.hasAction('action1')).toBeFalsy()

    })

})