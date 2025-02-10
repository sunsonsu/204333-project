export default async function catchError<T>(p:Promise<T>):Promise<[T, null] | [null, Error]> {
    try {
        const result = await p;
        return [result, null];
    } catch (error) {
        return [null, error instanceof Error ? error : new Error("Unknown Error.")]
    }
}