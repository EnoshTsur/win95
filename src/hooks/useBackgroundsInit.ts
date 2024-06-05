import { useMainScreenBackgroundStore } from "components/MainScreen/store/store"
import { Background } from "components/MainScreen/store/types"
import { pipe } from "fp-ts/lib/function"
import * as A from 'fp-ts/ReadonlyArray'
import { useCallback, useEffect, useState } from "react"
import { useQuery } from "react-query"

interface ImageData {
    readonly data: number[]
}

export interface Image {
    readonly filename: string
    readonly contentType: string
    readonly imageData: ImageData
}

// const fetchBackgrounds = async () => {
//     const data = await fetch('http://localhost:4899/background/get')
//     return await data.json()
// }

const useBackgrounInit = () => {

    // TODO:// remove this
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 200)
    }, [])


    // const { data, error, isLoading } = useQuery<ReadonlyArray<Image>, Error>(['background'], { queryFn: fetchBackgrounds }) 

    // const { setMainScreenBackgrounds } = useMainScreenBackgroundStore(({ setMainScreenBackgrounds }) => ({ setMainScreenBackgrounds }))

    // const mapToBackgrounds = useCallback((data: ReadonlyArray<Image>): ReadonlyArray<Background> => pipe(
    //     data,
    //     A.map(({ filename, contentType, imageData: { data }}) => ({
    //         fileName: filename,
    //         url: pipe(
    //             data,
    //             (d) => new Uint8Array(d),
    //             uint => new Blob([uint], { type: contentType }),
    //             blob => URL.createObjectURL(blob)
    //         )
    //     }))
    // ), [])

    // useEffect(() => {
    //     if (data) {            
    //         const backgrounds: ReadonlyArray<Background> = [ { fileName: '[None]', url: ''}, ...mapToBackgrounds(data) ];
    //         setMainScreenBackgrounds(backgrounds)
    //     }

    //     if (error) {
    //         console.error(error);
    //     }
    // }, [data, error])

    return { isLoading }
}

export default useBackgrounInit