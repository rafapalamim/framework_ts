export default interface FileSystem {
    getOriginalName(): string
    getName(): string
    getExtension(): string
    getFileSizeInByte(): number
    getFileSizeInBestRepresentation(): string
    getMimeType(): string
    getUrl(): string
    getPath(): string

    save(): Promise<void>
    delete(): Promise<void>
    getContent(): Promise<unknown>
}