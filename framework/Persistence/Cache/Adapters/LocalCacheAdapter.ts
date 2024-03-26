import path from 'path'
import CacheHandler, { CacheType } from '../CacheHandler'
import fs from 'fs'

export default class LocalCacheAdapter<D> extends CacheHandler<string, D> {

    private readonly cacheAbsolutePath: string

    constructor(cacheAbsolutePath?: string) {
        super()

        this.cacheAbsolutePath = cacheAbsolutePath ?? path.resolve(__dirname, '..', '..', '..', '..', 'storage', 'cache')

        if (!fs.existsSync(this.cacheAbsolutePath)) {
            fs.mkdirSync(this.cacheAbsolutePath, { recursive: true })
        }
    }

    protected async persist(identification: string, data: D, ttlInMinutes?: number | undefined): Promise<void> {

        const ttl = ttlInMinutes ? (ttlInMinutes * 60000) + Date.now() : null

        const fileName = `${identification}.cache`
        const filePath = path.resolve(this.cacheAbsolutePath, fileName)
        const newData = { data, ttl } as CacheType<D>

        fs.writeFileSync(filePath, JSON.stringify(newData).toString(), { encoding: 'utf8', flag: 'w', mode: 0o644 })
    }

    protected async findByIdentification(identification: string): Promise<D | null> {

        if (!this.fileExists(identification)) {
            return null
        }

        const cacheResult = JSON.parse(fs.readFileSync(this.getFilePath(identification), { encoding: 'utf8', flag: 'r' })) as CacheType<D>

        if (!cacheResult.ttl || cacheResult.ttl === null) {
            return cacheResult.data
        }

        if (Date.now() <= cacheResult.ttl) {
            return cacheResult.data
        }

        return null
    }

    protected async delete(identification: string): Promise<void> {
        if (this.fileExists(identification)) fs.unlinkSync(this.getFilePath(identification))
    }

    protected async deleteAll(): Promise<void> {
        fs.rmSync(this.cacheAbsolutePath, { recursive: true, force: true })
        fs.mkdirSync(this.cacheAbsolutePath, { recursive: true })
    }

    private fileExists(identification: string): boolean {
        return fs.existsSync(this.getFilePath(identification))
    }

    private getFilePath(identification: string): string {
        const fileName = `${identification}.cache`
        return path.resolve(this.cacheAbsolutePath, fileName)
    }
}