import { describe, test, expect } from '@jest/globals'
import Action from './Action'
import Role from './Role'
import Module from './Module'
import Authorizable from './Authorizable'

type MockCurrentUserData = {
    id: string | number,
    name: string,
    email: string
}

class MockCurrentUser extends Authorizable<MockCurrentUserData> { }

const userData = { id: 1, name: 'John Doe', email: 'johndoe@mail.com' }

describe('Authorizable unit test', () => {

    test('Should be able to validate the current user data', () => {

        const user = new MockCurrentUser(userData, [])
        expect(user.data.id).toBe(userData.id)
        expect(user.data.name).toBe(userData.name)
        expect(user.data.email).toBe(userData.email)

    })

    test('Should not be able to validate the current user withour roles permissions', () => {

        const user = new MockCurrentUser(userData, [])

        expect(() => user.canExecuteActionOnModule('action2', 'module1')).toThrowError('User cannot access the \'module1\' module')
        expect(() => user.canExecuteActionOnModule('action1', 'module2')).toThrowError('User cannot access the \'module2\' module')

    })

    test('Should be able to validate the current user permissions', () => {

        const action1 = new Action(1, 'action1')
        const action2 = new Action(2, 'action2')

        const module1 = new Module(1, 'module1', [action1])
        const module2 = new Module(2, 'module2', [action2])

        const role = new Role(1, 'role1', [module1, module2])

        const user = new MockCurrentUser(userData, [role])

        expect(() => user.canExecuteActionOnModule('action1', 'module1')).not.toThrowError()
        expect(() => user.canExecuteActionOnModule('action2', 'module2')).not.toThrowError()


        expect(() => user.canExecuteActionOnModule('action2', 'module1')).toThrowError('User cannot execute the \'action2\' on \'module1\' module')
        expect(() => user.canExecuteActionOnModule('action1', 'module2')).toThrowError('User cannot execute the \'action1\' on \'module2\' module')

    })

    test('Should be able to validate the current user permissions with multiple roles', () => {

        const action1 = new Action(1, 'action1')
        const action2 = new Action(2, 'action2')
        const action3 = new Action(3, 'action3')

        const module1 = new Module(1, 'module1', [action1, action2])
        const module2 = new Module(2, 'module2', [action3])

        const role1 = new Role(1, 'role1', [module1])
        const role2 = new Role(2, 'role2', [module2])

        const user = new MockCurrentUser(userData, [role1, role2])

        expect(() => user.canExecuteActionOnModule('action1', 'module1')).not.toThrowError()
        expect(() => user.canExecuteActionOnModule('action2', 'module1')).not.toThrowError()
        expect(() => user.canExecuteActionOnModule('action3', 'module2')).not.toThrowError()

        expect(() => user.canExecuteActionOnModule('action3', 'module1')).toThrowError('User cannot execute the \'action3\' on \'module1\' module')
        expect(() => user.canExecuteActionOnModule('action1', 'module2')).toThrowError('User cannot execute the \'action1\' on \'module2\' module')
        expect(() => user.canExecuteActionOnModule('action2', 'module2')).toThrowError('User cannot execute the \'action2\' on \'module2\' module')

    })

    test('Should not be able to validate the current user permissions when requisited action is not setted', () => {

        const action1 = new Action(1, 'action1')
        const action2 = new Action(2, 'action2')
        const action3 = new Action(3, 'action3')

        const module1 = new Module(1, 'module1', [])
        const module2 = new Module(2, 'module2', [action1, action2, action3])

        const role1 = new Role(1, 'role1', [module1, module2])
        const role2 = new Role(2, 'role2', [module1, module2])

        const user = new MockCurrentUser(userData, [role1, role2])

        expect(() => user.canExecuteActionOnModule('action1', 'module1')).toThrowError('User cannot execute the \'action1\' on \'module1\' module')
        expect(() => user.canExecuteActionOnModule('action2', 'module1')).toThrowError('User cannot execute the \'action2\' on \'module1\' module')
        expect(() => user.canExecuteActionOnModule('action3', 'module1')).toThrowError('User cannot execute the \'action3\' on \'module1\' module')

        expect(() => user.canExecuteActionOnModule('action1', 'module2')).not.toThrowError()
        expect(() => user.canExecuteActionOnModule('action2', 'module2')).not.toThrowError()
        expect(() => user.canExecuteActionOnModule('action3', 'module2')).not.toThrowError()

    })


})