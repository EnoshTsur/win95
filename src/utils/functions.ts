export const splitIntoChunks = <T>(array: ReadonlyArray<T>) => (numberOfChunks: number) =>  {
        if (numberOfChunks <= 0) {
            throw new Error("numberOfChunks must be greater than 0");
        }

        const chunkSize = Math.ceil(array.length / numberOfChunks);

        return array.reduce((acc, _, index) => {
            if (index % chunkSize === 0) {
                return [...acc, array.slice(index, index + chunkSize)];
            }
            return acc;
        }, [] as ReadonlyArray<ReadonlyArray<T>>);
}



export const splitIntoLimitedLengthChunks = <T>(array: ReadonlyArray<T>) => (arrayLimitLength: number) => {
        if (arrayLimitLength <= 0) {
            throw new Error("arrayLimitLength must be greater than 0");
        }

        return array.reduce((acc, _, index) => {
            if (index % arrayLimitLength === 0) {
                return [...acc, array.slice(index, index + arrayLimitLength)];
            }
            return acc;
        }, [] as ReadonlyArray<ReadonlyArray<T>>);
}