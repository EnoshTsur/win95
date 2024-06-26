import styled from "styled-components"
import WindowsButton from "../WindowsButton/WindowsButton"
import StartRightPanel from "components/StartRightPanel/StartRightPanel"
import useFileExplorerLocation from "components/FileExplorer/hooks/useFileExplorerLocation"
import dashedBg from '../../assets/bg-scroll.png'

const Container = styled.div`
    background-color: ${({ theme: { colors } }) => colors.menu };
    border-top: 1px solid ${({ theme: { colors } })=>  colors.window };
    display: flex;
    justify-content: space-between;
    height: 5%;
`

const ExplorerMinimize = styled.div`
    margin: 0.5rem 0;
    border-left: 2px solid black;
    border-top: 2px solid black;
    border-bottom: 1px solid white;
    border-right: 1px solid white;
    background-image: url(${dashedBg});
    background-size: contain;
    display: flex;
    gap: 2px;
    align-items: center;
    padding: 0 0.5rem;
    min-width: 10rem;

    span {
        font-family: mslevi;
        letter-spacing: 1px;
        font-weight: 600;
        padding-right: 1rem;
    }
`

const Icon = styled.img`
    width: 2rem;
    height: 2rem;
`

const StartContainer = () => {

    const { isRouting, icon, title } = useFileExplorerLocation()
    return (
        <Container>
            <div style={{ display: 'flex'}}>
                <WindowsButton />
                { isRouting && (
                    <ExplorerMinimize>
                        <Icon src={icon} />
                        <span>{title}</span>
                    </ExplorerMinimize>
                )}
            </div>
            <StartRightPanel />
        </Container>
    )
}

export default StartContainer