export default interface EmailBody {
    getHtml(): string
    getText(): string
}