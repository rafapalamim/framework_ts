import Authorizable from '../../@framework/Auth/Authorization/Authorizable'
import { CurrentUserFields } from '../../src/AuthModule/@Config/CurrentUserFields'

declare global {
    namespace Express {
        interface Request {
            startedAtInMs: number,
            currentUser: Authorizable<CurrentUserFields>
        }
    }
}