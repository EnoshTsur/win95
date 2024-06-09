import Tooltip from "components/Tooltip/Tooltip";
import { useClockState } from "store/store";
import styled from "styled-components";
import volumeIcon from '../../assets/volume-icon.png'

const PanelWrapper = styled.div`
    border-left: 3px solid ${({ theme }) => theme.colors.buttonShadow };
    border-top: 3px solid ${({ theme }) => theme.colors.buttonShadow};
    border-bottom: 3px solid ${({ theme }) => theme.colors.white };
    border-right: 3px solid ${({ theme }) => theme.colors.white };
    margin: 0.5rem;
    display: flex;
    align-items: center;
    padding: 0 0.8rem;
    font-family: mslevi;
    gap: 1px;
`

const VolumeIcon = styled.img`
    width: 2rem;
    height: 1.8rem;
`

const StartRightPanel = () => {
    const { time, fullTime } = useClockState()

    return (
        <Tooltip title={fullTime}>
            <PanelWrapper>
                <VolumeIcon src={volumeIcon} />
                {time}
            </PanelWrapper>
        </Tooltip>
    )
}

export default StartRightPanel