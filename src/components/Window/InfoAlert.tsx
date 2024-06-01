import { ButtonProps } from "components/Button/Button"
import Window from "./Window"
import { useMemo } from "react"
import { IoMdClose } from "react-icons/io"
import styled from "styled-components"

const InfoAlertWrapper = styled.div`
    padding: 15px;
    font-family: mslevi;
    letter-spacing: 1px;
    font-weight: 600;
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    border-left: 1px solid white;
    border-top: 1px solid white;
    border-bottom: ${({ theme }) => theme.colors.buttonShadow};
    border-right: ${({ theme }) => theme.colors.buttonShadow};

`

const CloseWrapper = styled.div`
    color: white;
    font-size: 24px;
    box-shadow: 3px 2px 0px grey;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    border-radius: 50%;
    background-color: red;
    border: 1px solid darkred;
`

interface InfoAlertProps {
    readonly textContent: string
    readonly title?: string
    readonly status?: 'ERROR' | 'WARNING' | 'INFO'
    readonly panelButtons: ReadonlyArray<ButtonProps>
}

const InfoAlert = ({ textContent, title, status, panelButtons } : InfoAlertProps) => {

    const alertInfoButtons: ReadonlyArray<ButtonProps> = useMemo(() => [
        { children: <IoMdClose />, disabled: true }
    ], [])

    const icon = useMemo(() => {
        switch (status) {
            case 'ERROR':
                return (
                    <CloseWrapper>
                        <IoMdClose  style={{ }}/>
                    </CloseWrapper>
                )
            default: 
                return (
                    <>
                    </>
                )
        }
    }, [status])

    return (
        <Window titleButtons={alertInfoButtons} style={{ zIndex: 10 }} title={title} panelButtons={panelButtons}>
            <InfoAlertWrapper>
                { icon }
                { textContent }
            </InfoAlertWrapper>
        </Window>
    )
}

export default InfoAlert