import React from "react";
import styled from "styled-components";
import useMainScreenItem from "./hooks/useMainScreenItem";

const ScreenItem = styled.div<{ isactive: string, editable: string }>`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    font-family: mslevi;

    &:hover{
        cursor: pointer;    
    }

    img {
        width: 80px;
    }


    span {
        cursor: ${({ editable }) => editable === 'true' ? 'text': 'pointer'};
        border: ${({ theme, isactive }) => isactive === 'true' ? `1px dashed ${theme.colors.white}` : `1px solid ${theme.colors.windowsBg}` };
        background-color: ${({ theme, isactive }) => isactive === 'true' ? theme.colors.alertTitleBar : theme.colors.windowsBg};
        color: white;
        letter-spacing: 1px;
        max-width: 6rem;

        &:focus {
            outline: none;
            background-color: white;
            color: black;
        }
    }
`

interface MainScreenItemProps {
    readonly isActive: boolean
    readonly icon: string
    readonly label: string
    readonly spanStyle?: React.CSSProperties
    readonly onClick: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    readonly onDoubleClick: () => void
}

// TODO: make it generic to reuse out side main screen
const MainScreenItem = ({ isActive, onClick, onDoubleClick, icon, label, spanStyle = {} }: MainScreenItemProps) => {

    const { ref, isEditable, setEditable, handleBlur} = useMainScreenItem({ label })

    return (
        <ScreenItem isactive={`${isActive}`} onClick={onClick} editable={`${isEditable}`}>
            <img src={icon} alt={label} onDoubleClick={onDoubleClick}/>
            <span 
                style={spanStyle}
                ref={ref}
                onBlur={handleBlur} 
                onDoubleClick={() => setEditable(true)}
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
            >
                {label}
            </span>
        </ScreenItem>
    )
}

export default MainScreenItem