import { useEffect } from "react"
import { useClockState } from "store/store"

const useClockUpdate = () => {

    const { updateTime } = useClockState()

    useEffect(() => {
        const id = setInterval(() => {
            updateTime()
        }, 100)

        return () => {
            clearInterval(id)
        }
    }, [])
}

export default useClockUpdate