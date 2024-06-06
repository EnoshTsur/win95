import { useCallback, useRef, useState } from "react"

const useFileItem = () => {

    const [isEditable, setEditable] = useState(false)

    const ref = useRef<HTMLSpanElement | null>(null)
    
    const handleBlur = useCallback(() => {
        setEditable(false)
    }, [ref.current])

    return {
        ref,
        isEditable,
        setEditable,
        handleBlur,
    }

}

export default useFileItem