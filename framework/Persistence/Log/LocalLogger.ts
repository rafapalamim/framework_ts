import path from 'path'
import Logger from './Logger'
import fs from 'fs'

export default class LocalLogger implements Logger {

    private readonly filePath: string
    private readonly fileName: string

    constructor(
        filePath?: string,
        fileExtension?: string
    ) {
        const date = new Date()
        this.fileName = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}.${fileExtension ?? 'log'}`
        this.filePath = filePath ?? path.resolve(__dirname, '..', '..', '..', 'storage', 'logs')

        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync(this.filePath, { recursive: true })
        }

        if (!fs.existsSync(path.resolve(this.filePath, this.fileName))) {
            fs.writeFileSync(path.resolve(this.filePath, this.fileName), '', { encoding: 'utf8', flag: 'a' })
        }
    }

    async info(data: object): Promise<void> {
        fs.writeFileSync(path.resolve(this.filePath, this.fileName), JSON.stringify(data).toString(), { encoding: 'utf8', flag: 'a+' })
    }

    async warning(data: object): Promise<void> {
        fs.writeFileSync(path.resolve(this.filePath, this.fileName), JSON.stringify(data).toString(), { encoding: 'utf8', flag: 'a+' })
    }

    async emergency(data: object): Promise<void> {
        fs.writeFileSync(path.resolve(this.filePath, this.fileName), JSON.stringify(data).toString(), { encoding: 'utf8', flag: 'a+' })
    }

}