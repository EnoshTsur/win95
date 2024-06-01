import styled from "styled-components";

const BackdropWrapper = styled.div<{ zindex: number }>`
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${({ zindex }) => zindex};
`
interface BackdropProps {
    readonly children: React.ReactNode
    readonly zIndex: number
}

const Backdrop = ({ children, zIndex }: BackdropProps) => {
    return (
        <BackdropWrapper zindex={zIndex}>
            { children }
        </BackdropWrapper>
    )
}

export default Backdrop