import Authorizable from '../../@framework/Auth/Authorization/Authorizable'
import { CurrentUserData } from '../../src/@Config/Auth/CurrentUserData'

declare global {
    namespace Express {
        interface Request {
            startedAtInMs: number,
            currentUser: Authorizable<CurrentUserData>
        }
    }
}