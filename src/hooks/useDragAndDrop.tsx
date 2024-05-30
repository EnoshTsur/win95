import { useCallback, useState } from "react"

const useDragAndDrop = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const [isDragging, setDragging] = useState(false)
    
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        pauseEvent(e)
        console.log('down');
        
        setDragging(true)
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        })
    }, [position])


    const pauseEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(e.stopPropagation) e.stopPropagation();
        if(e.preventDefault) e.preventDefault();
        //@ts-ignore
        e.cancelBubble=true;
        //@ts-ignore
        e.returnValue=false;
        return false;
    }

    const handleMouseMove = useCallback(({ clientX, clientY }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log('move');

        if (isDragging) {
            setPosition({
                x: clientX - offset.x,
                y: clientY - offset.y
            })
        }
    }, [position, isDragging])

    const handleMouseUp = useCallback(() => {
        console.log('up');

        setDragging(false)
    }, [])

    const handleDragEnd = useCallback(() => {
        setDragging(false)
    }, [])

    return {
        isDragging,
        position,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleDragEnd,
    }
}

export default useDragAndDrop