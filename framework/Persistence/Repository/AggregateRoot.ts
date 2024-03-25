import Repository from './Repository'

export default interface AggregateRoot<M, I> extends Repository<M, I> { }