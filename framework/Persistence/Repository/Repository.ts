export default interface Repository<M, I> {
    save(data: M): Promise<void>
    findById(id: I): Promise<M>
    delete(id: I): Promise<void>
}