export type CacheType<T> = {
    data: T,
    ttl?: number | null
}

export default abstract class CacheHandler<I, D> {

    async write(identification: I, data: D, ttlInMinutes?: number): Promise<void> {
        await this.persist(identification, data, ttlInMinutes)
    }

    async find(identification: I): Promise<D | null> {
        const data = await this.findByIdentification(identification)
        return data ?? null
    }

    async clear(identification: I): Promise<void> {
        await this.delete(identification)
    }

    async clearAll(): Promise<void> {
        await this.deleteAll()
    }

    protected abstract persist(identification: I, data: D, ttlInMinutes?: number): Promise<void>
    protected abstract findByIdentification(identification: I): Promise<D | null>
    protected abstract delete(identification: I): Promise<void>
    protected abstract deleteAll(): Promise<void>

}