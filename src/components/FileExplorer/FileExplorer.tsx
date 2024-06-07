import Window from "components/Window/Window"
import styled from "styled-components"
import { useFileExplorerRoutesStore } from "./store/store"
import FileExplorerMenu from "./FileExplorerTopMenu/FileExplorerTopMenu"
import { Route, Routes } from "react-router-dom"
import useFileExplorer from "./hooks/useFileExplorer"
import useFileExplorerLocation from "./hooks/useFileExplorerLocation"
import useFileExplorerRoutesUpdate from "./hooks/useFileExplorerRoutesUpdate"

export const FileExplorerWrapper = styled.div`
    background-color: white;
    border-left: 1px solid ${({ theme }) => theme.colors.buttonShadow};
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
    align-items: top;
    padding: 20px 10px;
    width: 400px;
`
const LeftBottomBar = styled.div`
    flex-basis: 30%;
    padding-left: 5px;

`
const RightBottomBar = styled.div`
    flex-basis: 70%;
`

const FileExplorerBottomBar = styled.div`
    background-color: ${({ theme }) => theme.colors.menu};
    border-top: 1px solid ${({ theme }) => theme.colors.menuTitle};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    padding: 0 1px;

    ${LeftBottomBar}, ${RightBottomBar} {
        font-family: mslevi;
        height: 68%;
        width: 100%;
        font-size: 12px;
        margin: 2px 0;
        border-bottom: 1px solid white;
        border-right: 1px solid white;
        padding-top: 2px;
        justify-content: center;
        align-content: center;
        box-shadow: inset 1px 1px 0px 1px ${({ theme }) => theme.colors.buttonShadow};
    }
`

const FileExplorer = () => {

    const { titleButtons } = useFileExplorer()
    const { routes } = useFileExplorerRoutesStore(({ routes }) => ({ routes }))
    const { title, icon } = useFileExplorerLocation()
    const { itemsAtLocation: { result, found } } = useFileExplorerLocation()

    useFileExplorerRoutesUpdate()


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
            <FileExplorerBottomBar>
                <LeftBottomBar>
                    { found && `${Object.values(result).length} object[s]`}
                </LeftBottomBar>
                <RightBottomBar/>
            </FileExplorerBottomBar>
        </Window>
    )
}

export default FileExplorer