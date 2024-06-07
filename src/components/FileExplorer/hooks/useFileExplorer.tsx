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
    
    const handleFileExplorerNavigationOut = useCallback(() => {
        setExplorerOpen(false)
        navigate('/')
    }, [navigate])

    const generateTitleButtons: (onClose: () => void) => ReadonlyArray<ButtonProps> = useCallback((onClose) => [
        { children: <ButtonWrapper><FaRegWindowMinimize /></ButtonWrapper>, onClick: () => {}},
        { children: <ButtonWrapper><FaRegWindowMaximize /></ButtonWrapper>, onClick: () => {}},
        { children: <ButtonWrapper><IoMdClose /></ButtonWrapper>, onClick: onClose },
    ], [])

    return {
        generateTitleButtons,
        handleFileExplorerNavigationOut
    }
}

export default useFileExplorer