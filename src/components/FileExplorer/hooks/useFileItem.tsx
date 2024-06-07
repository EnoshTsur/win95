import { useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"

const useFileItem = () => {

    const ref = useRef<HTMLSpanElement | null>(null)

    const navigate = useNavigate()

    const handleNext = useCallback((hasNext: boolean, path: ReadonlyArray<string>) =>{
        if (hasNext) {
            navigate(`/${path.join('/')}`);
        }
    }, [navigate])

    
    const handleBlur = useCallback(() => {
    }, [ref.current])

    return {
        ref,
        handleBlur,
        handleNext
    }

}

export default useFileItem