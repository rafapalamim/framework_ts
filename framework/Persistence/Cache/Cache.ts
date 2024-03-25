export default interface Cache<I, D> {
    save(identification: I, data: D): Promise<void>
    find(identification: I): Promise<D>
    clear(identification: I): Promise<void>
}