import Email from './Email'
import EmailHandler from './EmailHandler'
import SMTPConfiguration from './SMTPConfiguration'
import nodemailer, { Transporter } from 'nodemailer'

export default abstract class NodemailerAdapter implements EmailHandler {

    private readonly transporter: Transporter

    constructor(configuration: SMTPConfiguration) {
        this.transporter = nodemailer.createTransport({
            host: configuration.host,
            port: configuration.port,
            secure: configuration.tls,
            auth: {
                user: configuration.user,
                pass: configuration.password
            },
            from: `"${configuration.sender.name}" <${configuration.sender.email}>`,
            replyTo: configuration.replyTo ? `"${configuration.replyTo.name}" <${configuration.replyTo.email}>` : undefined
        })
    }

    async send(email: Email): Promise<void> {

        const receiversList = email.receivers!
            .map((receiver) => `"${receiver.name}" <${receiver.email}>`)
            .join(',')

        const attachmentList = email.attachments
            ? email.attachments.map((attach) => {
                return { filename: attach.nameToFile, path: attach.pathToFile }
            })
            : undefined

        await this.transporter.sendMail({
            to: receiversList,
            subject: email.title!,
            text: email.textBody ?? undefined,
            html: email.htmlBody!,
            attachments: attachmentList
        })
    }

}