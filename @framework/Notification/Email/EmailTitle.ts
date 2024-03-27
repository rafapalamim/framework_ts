export default class EmailTitle {

    private readonly _title: string

    constructor(title: string) {

        const stringTitle = title.trim()

        if(stringTitle.length <= 0 || stringTitle.length > 70) throw new Error('An email title must be greater than 0 (zero) and less than 70 characters length')
        if(/[^a-zA-Z0-9~!$%^&*_=+}{'?\-. \\,]/.test(stringTitle)) throw new Error('There are special characters in the email title. Please review the email title.')

        this._title = title
    }

    get title(): string {
        return this._title
    }
}