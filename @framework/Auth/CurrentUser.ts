import Authorizable from './Authorization/Authorizable'

export type CurrentUserData = {
    id: number | string,
    name: string,
    email: string,
}

export default class CurrentUser extends Authorizable<CurrentUserData> { }