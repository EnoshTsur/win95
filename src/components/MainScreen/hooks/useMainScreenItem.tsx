import { useCallback, useRef, useState } from "react"
import { useMainScreenItemsStore } from "../store/store"

interface useMainScreenProps {
    readonly label: string
}

const useMainScreenItem = ({label}: useMainScreenProps) => {

    const { setMainScreenItems, mainScreenItems } = useMainScreenItemsStore(({ setMainScreenItems, mainScreenItems }) => ({ setMainScreenItems, mainScreenItems }))
    const [isEditable, setEditable] = useState(false)

    const ref = useRef<HTMLSpanElement | null>(null)
    
    const handleBlur = useCallback(() => {
        if (ref.current != null) {
            
            const newItems = mainScreenItems.map(({ label: itemLabel, ...rest }) => itemLabel === label 
            ? { label: ref.current?.innerText ?? label, ...rest } 
            : { label: itemLabel, ...rest } )
            
            setMainScreenItems(newItems) 
        }
        setEditable(false)
    }, [ref.current])

    return {
        ref,
        isEditable,
        setEditable,
        handleBlur,
    }

}

export default useMainScreenItem