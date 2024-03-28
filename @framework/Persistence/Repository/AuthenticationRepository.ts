import { CurrentUserFields } from '../../AuthModule/@Config/CurrentUserFields'

export default interface AuthenticationRepository<D> {
    makeLogin(data: D): Promise<CurrentUserFields | null>
}