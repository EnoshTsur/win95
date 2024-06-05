import { ButtonProps } from "components/Button/Button"
import Window from "components/Window/Window"
import { useMemo, useState } from "react"
import emarkIcon from '../../assets/emark-icon.png'
import questionIcon from '../../assets/question-icon.png'
import closeIcon from '../../assets/close-icon.png'

import styled from "styled-components"
import Backdrop from "./Backdrop"
import { createPortal } from "react-dom"

const AlertContent = styled.div`
    padding: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
`

const AlertMessage = styled.div`
    max-width: 300px;
    font-family: mslevi;
`

const AlertIcon = styled.img`
    width: 80px;
    height: 70px;
`

export type AlertStatus = 'ERROR'| 'WARNING' | 'QUESTION'

interface AlertProps {
    readonly title?: string
    readonly titleButtons: ReadonlyArray<ButtonProps>
    readonly message: string
    readonly status?: AlertStatus
    readonly panelButtons?: ReadonlyArray<ButtonProps>
}

const Alert = ({ title, titleButtons, message, status, panelButtons }: AlertProps) => {

    const [zIndex, setZindex] = useState(0)

    const icon = useMemo(() => {
        switch (status) {
            case 'ERROR':
                return (
                    <AlertIcon src={closeIcon} />
                )
            case 'WARNING':
                return (
                    <AlertIcon src={emarkIcon} />
                )
            case 'QUESTION':
                return (
                    <AlertIcon src={questionIcon} />
                )
            default: 
                return (
                    <>
                    </>
                )
        }
    }, [status])

    const alertProptal = useMemo(() => document.getElementById('alert-portal'), [])

    return createPortal(
        <Backdrop zIndex={zIndex}>  
            <Window title={{ title, titleButtons }} style={{ backgroundColor: '#c4c4c4  '}} panelButtons={panelButtons} getZIndex={(index) => setZindex(index)}>
                <AlertContent>
                    { status && icon }
                    <AlertMessage>
                    { message }
                    </AlertMessage>
                </AlertContent>
            </Window>
        </Backdrop>,
        alertProptal!
    )
}

export default Alert