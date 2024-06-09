import { useEffect, useMemo } from "react";
import { useOpenWindowState } from "store/store";

const windowIdGenerator = () => {
    let idgen = 1;
    return () => `window${idgen++}`
}

const idGenerator = windowIdGenerator()

interface useWindowProps {
    readonly getZIndex?: (zIndex: number) => void
}

const useWindow = ({ getZIndex }: useWindowProps) => {
    const { addWindow, removeWindow, openedWindows } = useOpenWindowState()
    
    const windowId = useMemo(() => idGenerator(), [])

    const zIndex = useMemo(() => openedWindows.find(({ id }) => id === windowId)?.zIndex ?? 0, [openedWindows])

    useEffect(() => {
        addWindow(windowId)
        return () => {
            removeWindow(windowId)
        }
    }, [])

    useEffect(() => {
        if (getZIndex != null) {
            getZIndex(zIndex)
        }
    }, [zIndex])

    return {
        zIndex,
        windowId,
    }
}

export default useWindow