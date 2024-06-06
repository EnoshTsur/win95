import { useFileExplorerStore } from "../store/store"
import { useCallback, useMemo } from "react"
import { ButtonProps } from "components/Button/Button"
import { FaRegWindowMaximize, FaRegWindowMinimize } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const ButtonWrapper = styled.div`
    display: flex;
    padding: 3px;
    align-item: center;
    justify-content: center;
`

const useFileExplorer = () => {
    
    const navigate = useNavigate()
    
    const { setExplorerOpen } = useFileExplorerStore(({ setExplorerOpen }) => ({ setExplorerOpen }))
    
    const handleClose = useCallback(() => {
        setExplorerOpen(false)
        navigate('/')
    }, [navigate])

    const titleButtons: ReadonlyArray<ButtonProps> = useMemo(() => [
        { children: <ButtonWrapper><FaRegWindowMinimize /></ButtonWrapper>, onClick: () => {}},
        { children: <ButtonWrapper><FaRegWindowMaximize /></ButtonWrapper>, onClick: () => {}},
        { children: <ButtonWrapper><IoMdClose /></ButtonWrapper>, onClick: handleClose },
    ], [])

    return {
        titleButtons,
    }
}

export default useFileExplorer