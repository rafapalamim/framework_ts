import CurrentUser from '../../@framework/Auth/CurrentUser'

declare global {
    namespace Express {
        interface Request {
            startedAtInMs: number,
            currentUser: CurrentUser
        }
    }
}