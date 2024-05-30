import styled from "styled-components";
import { mapToWallPaper } from "../context/DisplayContext";
import { useEffect } from "react";
import { useBackgroundState, useDispaySettingsState } from "store/store";

const ApplyBackgroundWrapper = styled.div<{ applybackground: string }>`
    height: 100%;
    ${({ applybackground }) => applybackground !== '[None]' && `background-image: url(${mapToWallPaper(applybackground)})`};
    ${({ applybackground, theme }) => applybackground === '[None]' && `background-color: ${theme.colors.windowsBg}`};
`

interface ApplyBackgroundProps {
    readonly children: React.ReactNode
}

const ApplyBackground = ({ children }: ApplyBackgroundProps) => {
    
    const { isOpen } = useDispaySettingsState()
    const { applyBackgroundUrl } = useBackgroundState()

    useEffect(() => {
        console.log(applyBackgroundUrl);
        
    }, [applyBackgroundUrl])

    
    return isOpen ? (
        <ApplyBackgroundWrapper applybackground={applyBackgroundUrl}>
            { children }
        </ApplyBackgroundWrapper>
    ) : (
        <>
        {children}
        </>
    )
}

export default ApplyBackground