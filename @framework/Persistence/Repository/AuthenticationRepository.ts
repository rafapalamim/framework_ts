import { CurrentUserFields } from '../../@Config/Auth/CurrentUserFields'

export default interface AuthenticationRepository<D> {
    makeLogin(data: D): Promise<CurrentUserFields>
}