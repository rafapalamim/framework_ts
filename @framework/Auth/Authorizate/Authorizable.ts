import Permission from './Permission'

export default interface Authorizable {
    get permissions(): Permission[]
}