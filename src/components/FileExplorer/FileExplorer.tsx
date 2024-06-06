import Window from "components/Window/Window"
import styled from "styled-components"
import { useFileExplorerRoutesStore } from "./store/store"
import FileExplorerMenu from "./FileExplorerTopMenu/FileExplorerTopMenu"
import { Route, Routes } from "react-router-dom"
import useFileExplorer from "./hooks/useFileExplorer"
import useFileExplorerLocation from "./hooks/useFileExplorerLocation"
import { useEffect } from "react"



export const FileExplorerWrapper = styled.div`
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
    align-items: top;
    padding: 10px;
    width: 400px;
`

const FileExplorer = () => {

    const { titleButtons } = useFileExplorer()
    const { routes } = useFileExplorerRoutesStore(({ routes }) => ({ routes }))
    const { title, icon } = useFileExplorerLocation()

    return (
        <Window title={{ title, titleButtons, icon }} >
            <FileExplorerMenu />
            <FileExplorerWrapper>
                    <Routes>
                        { routes.map(({ path, component  }, index) => (
                            <Route key={path + index} path={path} Component={component} />
                        ))}
                    </Routes>
            </FileExplorerWrapper>
        </Window>
    )
}

export default FileExplorer