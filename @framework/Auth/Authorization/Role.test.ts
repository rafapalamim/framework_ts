import { describe, test, expect } from '@jest/globals'
import Role from './Role'
import Module from './Module'
import Action from './Action'

describe('Authorization Role unit test', () => {

    test('Should be able to create a authorization role with empty modules', () => {

        const role = new Role(1, 'role1', [])

        expect(role.id).toBe(1)
        expect(role.slug).toBe('role1')
        expect(role.modules.length).toBe(0)
        expect(role.hasModule('module1')).toBeFalsy()
        expect(role.hasActionOnModule('action1', 'module1')).toBeFalsy()
        expect(role.hasActionOnModule('action2', 'module2')).toBeFalsy()
    })

    test('Should be able to create a authorization role with modules with empty actions', () => {

        const module = new Module(1, 'module1', [])
        const role = new Role(1, 'role1', [module])

        expect(role.id).toBe(1)
        expect(role.slug).toBe('role1')
        expect(role.modules.length).toBe(1)
        expect(role.hasModule('module1')).toBeTruthy()
        expect(role.hasActionOnModule('action1', 'module1')).toBeFalsy()
    })

    test('Should be able to create a authorization role with modules and actions', () => {

        const action = new Action(1, 'action1')
        const module = new Module(1, 'module1', [action])
        const role = new Role(1, 'role1', [module])

        expect(role.id).toBe(1)
        expect(role.slug).toBe('role1')
        expect(role.modules.length).toBe(1)
        expect(role.hasModule('module1')).toBeTruthy()
        expect(role.hasModule('module2')).toBeFalsy()
        expect(role.hasActionOnModule('action1', 'module1')).toBeTruthy()
        expect(role.hasActionOnModule('action2', 'module1')).toBeFalsy()
        expect(role.hasActionOnModule('action2', 'module2')).toBeFalsy()
    })

})