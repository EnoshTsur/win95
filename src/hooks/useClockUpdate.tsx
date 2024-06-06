import { useEffect } from "react"
import { useClockState } from "store/store"

const useClockUpdate = () => {

    const { updateTime, updateFullTime } = useClockState()

    useEffect(() => {
        const id = setInterval(() => {
            updateTime()
            updateFullTime()
        }, 100)

        return () => {
            clearInterval(id)
        }
    }, [])
}

export default useClockUpdate