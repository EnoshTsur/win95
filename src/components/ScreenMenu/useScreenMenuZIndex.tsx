import { useMemo } from "react"
import { useOpenWindowState } from "store/store"
import * as A from 'fp-ts/ReadonlyArray'

const useScreenMenuZIndex = () => {
    const { openedWindows } = useOpenWindowState(({ openedWindows }) => ({ openedWindows }))

    const zIndex = useMemo(() => {
        if (A.isEmpty(openedWindows)) {
            return 1
        }
        return openedWindows[openedWindows.length - 1].zIndex + 1 ?? 0
    }, [openedWindows])

    return {
        zIndex
    }
}

export default useScreenMenuZIndex