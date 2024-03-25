export default interface HttpRequest<R, Q> {
    get body(): R
    get query(): Q
}