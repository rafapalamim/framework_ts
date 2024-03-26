import EmailBody from './EmailBody'
import EmailHandler from './EmailHandler'
import EmailTitle from './EmailTitle'

export type EmailReceiverType = {
    name: string,
    email: string
}

export type EmailAttachmentType = {
    nameToFile: string,
    pathToFile: string
}

export default class Email{

    private _receivers: EmailReceiverType[] = []
    private _attachments: EmailAttachmentType[] = []
    private _title: EmailTitle | null = null
    private _body: EmailBody | null = null

    constructor(private readonly handler: EmailHandler) { }

    addTitle(title: EmailTitle): this {
        this._title = title
        return this
    }

    addBody(body: EmailBody): this {
        this._body = body
        return this
    }

    addReceiver(receiver: EmailReceiverType | EmailReceiverType[]): this {

        const newListOfReceivers = !Array.isArray(receiver) ? [receiver] : receiver

        newListOfReceivers.forEach((newReceiver) => {
            const findReceiver = this._receivers.find((settedReceiver) => settedReceiver.email === newReceiver.email)
            if (!findReceiver) this._receivers.push(newReceiver)
        })

        return this
    }

    addAttachment(attachment: EmailAttachmentType | EmailAttachmentType[]): this {

        const newListOfAttachments = !Array.isArray(attachment) ? [attachment] : attachment

        newListOfAttachments.forEach((newAttach) => {
            const findAttach = this._attachments.find((settedAttach) => settedAttach.pathToFile === newAttach.pathToFile)
            if (!findAttach) this._attachments.push(newAttach)
        })

        return this
    }

    send(): void {
        this.validate()
        this.handler.send(this)
    }

    private validate() : void {

    }

    get title(): string | null {
        return this._title ? this._title.title : null
    }

    get htmlBody(): string | null {
        return this._body ? this._body.getHtml() : null
    }

    get textBody(): string | null {
        return this._body ? this._body.getText() : null
    }

    get receivers(): EmailReceiverType[] | null {
        return this._receivers ?? null
    }

    get attachments(): EmailAttachmentType[] | null {
        return this._attachments ?? null
    }
}