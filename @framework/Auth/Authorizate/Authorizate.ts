import Authorizable from './Authorizable'
import AuthorizateHandler from './AuthorizateHandler'

export default class Authorizate {

    constructor(readonly authorizateHandler: AuthorizateHandler) { }

    user(user: Authorizable): this {
        this.authorizateHandler.addUser(user)
        return this
    }

    validatePermission(permissionIdentification: string | number): boolean {
        return this.authorizateHandler.hasPermission(permissionIdentification)
    }

    validateAllPermissions(permissionsIdentification: (string|number)[]): boolean {
        return this.authorizateHandler.hasAllPermissions(permissionsIdentification)
    }

    validateOneOrMorePermissions(permissionsIdentification: (string|number)[]): boolean {
        return this.authorizateHandler.hasOneOrMorePermissions(permissionsIdentification)
    }

}