import Email from './Email'

export default interface EmailHandler {
    send(email: Email) : Promise<void>
}