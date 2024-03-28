export default interface TokenHandler<T> {
    generate(payload: object): T
    verify(plainToken: string): T
}