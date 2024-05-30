import { useClockState } from "store/store";
import styled from "styled-components";

const PanelWrapper = styled.div`
    border-left: 3px solid ${({ theme }) => theme.colors.buttonShadow };
    border-top: 3px solid ${({ theme }) => theme.colors.buttonShadow};
    border-bottom: 3px solid ${({ theme }) => theme.colors.white };
    border-right: 3px solid ${({ theme }) => theme.colors.white };
    margin: 2px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    font-family: mslevi;
`

const StartRightPanel = () => {
    const { time } = useClockState()

    return (
    <PanelWrapper>
        {time}
    </PanelWrapper>
    )
}

export default StartRightPanel