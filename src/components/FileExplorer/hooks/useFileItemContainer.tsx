import { useCallback, useState } from "react"

const useFileItemContainer = () => {

    const [active, setActive] = useState(-1)

    const toggleActive = useCallback((index: number) => {
        setActive(index === active ? -1 : index)
    }, [active])

    return {
        active,
        setActive,
        toggleActive,
    }
}

export default useFileItemContainer