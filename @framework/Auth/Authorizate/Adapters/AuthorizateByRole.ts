import AuthorizateHandler from '../AuthorizateHandler'

export default class AuthorizateByRole extends AuthorizateHandler {

    hasPermission(permissionIdentification: string | number): boolean {

        if (!this.user) return false

        const findPermission = this.user.permissions.find((permission) => permission.role === permissionIdentification)

        return findPermission !== undefined
    }

    hasAllPermissions(permissionsIdentification: (string | number)[]): boolean {

        if (!this.user) return false

        const findPermissions = permissionsIdentification.map((testPermission) => {
            const findPermission = this.user!.permissions.find((permission) => permission.role === testPermission)
            return findPermission ? true : false
        })

        return findPermissions.length === permissionsIdentification.length
    }

    hasOneOrMorePermissions(permissionsIdentification: (string | number)[]): boolean {

        if (!this.user) return false

        const findPermissions = permissionsIdentification.map((testPermission) => {
            const findPermission = this.user!.permissions.find((permission) => permission.role === testPermission)
            return findPermission ? true : false
        })

        return findPermissions.length > 0

    }
}