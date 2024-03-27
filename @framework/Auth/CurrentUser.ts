export default class CurrentUser {
    constructor(readonly id: string, readonly name: string, readonly email: string, readonly permissions: unknown) { }
}