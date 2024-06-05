import { useMemo, useRef, useState } from "react"

const useMenu = () => {
    const [hoveredItem, setHoveredItem] = useState<{ row: number, col: number } | null>(null)

    const ref = useRef<HTMLDivElement | null>(null)

    const computedX = useMemo(() => {
        if (ref.current != null) {
            const { width } = ref.current.getBoundingClientRect()
            return width - 10
        }
        return 0;
    }, [ref.current])

    return {
        ref,
        hoveredItem,
        setHoveredItem,
        computedX,
    }
}

export default useMenu