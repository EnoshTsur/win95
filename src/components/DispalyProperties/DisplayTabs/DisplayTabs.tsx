import { useMemo } from "react"
import styled from "styled-components"

const TabsArea = styled.div`
    height: 39px;
`

const TabsContainer = styled.div`
    display: flex;
    gap; 2px;
    padding-left: 10px;
    top: 10px;
    position: absolute;
    background: ${({ theme }) => theme.colors.menu};
`

const TabItem = styled.div<{ chosen: number }>`
    display: flex;
    padding: 5px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    border-top: 2px solid ${({ theme }) => theme.colors.white};
    border-right: 2px solid ${({ theme }) => theme.colors.darkShadow};
    border-bottom: ${({ theme, chosen }) => chosen === 0 ? 'none' : `2px solid ${theme.colors.white}` };
    font-family: mslevi;
    font-size: 14px;

    &:hover{
        cursor: ${({ chosen }) => chosen === 0 ? 'inherit' : 'pointer'};
        background-color: ${({ theme }) => theme.colors.buttonFace}
    }
`

const DisplayTabs = () => {

const tabs = useMemo(() => ['Background', 'Screen Saver', 'Appearance', 'Settings'], [])

    return (
        <>
            <TabsContainer>
                    { tabs.map((title, i) => (
                        <TabItem key={title} chosen={i} >
                            { title }
                        </TabItem>
                    ))}
                </TabsContainer>
                <TabsArea />
        </>
    )
}

export default DisplayTabs