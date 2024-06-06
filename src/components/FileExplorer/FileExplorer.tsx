import Window from "components/Window/Window"
import styled from "styled-components"
import { useFileExplorerStore, useWindowsFileSystemStore } from "./store/store"
import MainScreenItem from "components/MainScreen/MainScreenItem"
import { useCallback, useMemo } from "react"
import FileExplorerMenu from "./FileExplorerTopMenu/FileExplorerTopMenu"
import { ButtonProps } from "components/Button/Button"
import { IoMdClose } from "react-icons/io"
import { FaRegWindowMaximize, FaRegWindowMinimize } from "react-icons/fa"
import { BrowserRouter, Routes } from "react-router-dom"

const FileExplorerWrapper = styled.div`
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
    align-items: top;
    padding: 10px;
    width: 400px;
`

const ButtonWrapper = styled.div`
    display: flex;
    padding: 3px;
    align-item: center;
    justify-content: center;
`

const FileExplorer = () => {

    const { openFileSystem, windowsFileSystem, setOpenFileSystem } = useWindowsFileSystemStore(({ windowsFileSystem, openFileSystem, setOpenFileSystem }) => ({ windowsFileSystem, openFileSystem ,setOpenFileSystem}))

    const itemsToDisplay = useMemo(() => Object.values(openFileSystem), [openFileSystem, windowsFileSystem])

    const {setActiveExplorer } = useFileExplorerStore(({ setActiveExplorer }) => ({ setActiveExplorer }))

    const handleClose = useCallback(() => setActiveExplorer(''), [])

    const buttons: ReadonlyArray<ButtonProps> = useMemo(() => [
        { children: <ButtonWrapper><FaRegWindowMinimize /></ButtonWrapper>, onClick: () => {}},
        { children: <ButtonWrapper><FaRegWindowMaximize /></ButtonWrapper>, onClick: () => {}},
        { children: <ButtonWrapper><IoMdClose /></ButtonWrapper>, onClick: handleClose },
    ], [])

    return (
        <Window title={{ title: "File Explorer", titleButtons: buttons }} >
            <FileExplorerMenu />
            <FileExplorerWrapper>
                {/* <BrowserRouter>
                    <Routes>

                    </Routes>
                </BrowserRouter> */}
                {
                    itemsToDisplay.map(({ label, icon, items }, index) => (
                        <MainScreenItem 
                            key={label + icon + index} 
                            label={label} 
                            icon={icon} 
                            isActive={false} 
                            onClick={() => {}} 
                            onDoubleClick={() => {
                                if (Object.values(items).length > 0) {
                                    setOpenFileSystem(items)
                                }
                            }}
                            spanStyle={{ background: 'rgba(0, 0, 0, 0.2)', border: 'none'}}
                        />
                ) )}
            </FileExplorerWrapper>
        </Window>
    )
}

export default FileExplorer