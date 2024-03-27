import CacheHandler from './CacheHandler'

export default class Cache {

    constructor(private readonly handler: CacheHandler) {}

    async save(identification: any, data: any): Promise<void> {
        await this.handler.write(identification, data)
    }

    async find(identification: any): Promise<any> {
        const cache = await this.handler.findByIdentification(identification)
        return cache ?? null
    }

    async clear(identification: any): Promise<void> {
        await this.handler.delete(identification)
    }

    async clearAll(): Promise<void> {
        await this.handler.deleteAll()
    }

}