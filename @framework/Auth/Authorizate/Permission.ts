export default class Permission {
    constructor(
        readonly role: string | number | null,
        readonly action: string | number | null
    ) { }
}