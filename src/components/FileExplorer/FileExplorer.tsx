import Window from "components/Window/Window"
import styled from "styled-components"
import { useWindowsFileSystemStore } from "./store/store"
import MainScreenItem from "components/MainScreen/MainScreenItem"
import { useMemo } from "react"

const FileExplorerWrapper = styled.div`
    background-color: white;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px;
`

const FileExplorer = () => {

    const { openFileSystem, windowsFileSystem, setOpenFileSystem } = useWindowsFileSystemStore(({ windowsFileSystem, openFileSystem, setOpenFileSystem }) => ({ windowsFileSystem, openFileSystem ,setOpenFileSystem}))

    const itemsToDisplay = useMemo(() => Object.values(openFileSystem), [openFileSystem, windowsFileSystem])

    return (
        <Window title={{ title: "File Explorer"}}>
            <FileExplorerWrapper>
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