import styled from "styled-components"
import WindowsButton from "../WindowsButton/WindowsButton"
import StartRightPanel from "components/StartRightPanel/StartRightPanel"

const Container = styled.div`
    background-color: ${({ theme: { colors } }) => colors.menu };
    border-top: 1px solid ${({ theme: { colors } })=>  colors.window };
    display: flex;
    justify-content: space-between;
`

const StartContainer = () => (
   <Container>
    <WindowsButton />
    <StartRightPanel />
   </Container>
)

export default StartContainer