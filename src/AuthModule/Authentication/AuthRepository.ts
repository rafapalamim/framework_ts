import AuthenticationRepository from '../../Persistence/Repository/AuthenticationRepository'
import { AuthenticationUserFields } from '../@Config/AuthenticationUserFields'

export default interface AuthRepository extends AuthenticationRepository<AuthenticationUserFields> { }