import AuthorizationError from '../../Error/AuthorizationError'
import Role from './Role'

export default abstract class Authorizable<D> {

    constructor(
        readonly data: D,
        readonly roles: Role[]
    ) { }

    canExecuteActionOnModule(actionSlug: string, moduleSlug: string): void {
        const rolesWithModule = this.roles.filter((role) => role.hasModule(moduleSlug))
        if (rolesWithModule.length === 0) throw new AuthorizationError(`User cannot access the '${moduleSlug}' module`)

        const canExecuteActionOnModule = rolesWithModule.find((role) => role.hasActionOnModule(actionSlug, moduleSlug))
        if (!canExecuteActionOnModule) throw new AuthorizationError(`User cannot execute the '${actionSlug}' on '${moduleSlug}' module`)
    }
}