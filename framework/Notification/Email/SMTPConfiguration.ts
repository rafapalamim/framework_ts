export default class SMTPConfiguration {

    replyTo: { name: string, email: string } | null

    constructor(
        readonly configurationAlias: string,
        readonly host: string,
        readonly user: string,
        readonly password: string,
        readonly port: number,
        readonly tls: boolean,
        readonly sender: { name: string, email: string },
        replyTo?: { name: string, email: string },
    ) {
        this.replyTo = replyTo ?? null
    }

}