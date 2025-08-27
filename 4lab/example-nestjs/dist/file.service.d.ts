export declare class FileService<T> {
    private readonly filePath;
    constructor(filePath: string);
    private initializeFile;
    read(): Promise<T>;
    write(data: T): Promise<void>;
}
