import AuthorizateHandler from '../AuthorizateHandler'

export default class AuthorizateByAction extends AuthorizateHandler {

    hasPermission(permissionIdentification: string | number): boolean {
        throw new Error('Method not implemented.')
    }

    hasAllPermissions(permissionsIdentification: (string | number)[]): boolean {
        throw new Error('Method not implemented.')
    }

    hasOneOrMorePermissions(permissionsIdentification: (string | number)[]): boolean {
        throw new Error('Method not implemented.')
    }

}