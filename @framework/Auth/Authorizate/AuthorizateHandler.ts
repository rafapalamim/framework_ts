import Authorizable from './Authorizable'

export default abstract class AuthorizateHandler {

    protected user: Authorizable | null = null

    addUser(user: Authorizable): void {
        this.user = user
    }

    abstract hasPermission(permissionIdentification: string | number): boolean
    abstract hasAllPermissions(permissionsIdentification: (string|number)[]): boolean
    abstract hasOneOrMorePermissions(permissionsIdentification: (string|number)[]): boolean
}