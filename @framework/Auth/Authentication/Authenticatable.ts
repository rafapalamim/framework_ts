import { CurrentUserFields } from '../../@Config/Auth/CurrentUserFields'
import AuthenticationRepository from '../../Persistence/Repository/AuthenticationRepository'

export default abstract class Authenticatable<D> {

    constructor(
        protected readonly authRepository: AuthenticationRepository<D>
    ) { }

    abstract login(data: D): Promise<CurrentUserFields>
}